import request from 'supertest';
import app from '../../app';
import { prisma } from '../../config/db';

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@test.com', 'user@test.com'] } }
  });

  // Создаём админа напрямую через prisma потому что signup всегда создаёт role: 'user'
  const bcrypt = await import('bcrypt');
  const hashed = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@test.com', password: hashed, role: 'admin' }
  });

  await prisma.user.create({
    data: { name: 'User', email: 'user@test.com', password: hashed, role: 'user' }
  });

  const adminRes = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@test.com', password: '123456' });

  const userRes = await request(app)
    .post('/auth/login')
    .send({ email: 'user@test.com', password: '123456' });

  adminToken = adminRes.body.accessToken;
  userToken = userRes.body.accessToken;
});

beforeEach(async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
});

afterAll(async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@test.com', 'user@test.com'] } }
  });
  await prisma.$disconnect();
});

describe('POST /products', () => {
  it('админ должен создать продукт и получить 201', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Laptop', price: 1200 });

    expect(res.status).toBe(201);
    expect(res.body.product).toHaveProperty('id');
    expect(res.body.product.name).toBe('Laptop');
  });

  it('обычный пользователь должен получить 403', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Laptop', price: 1200 });

    expect(res.status).toBe(403);
  });

  it('должен вернуть 400 если name не передан', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 1200 });

    expect(res.status).toBe(400);
  });

  it('должен вернуть 401 без токена', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Laptop', price: 1200 });

    expect(res.status).toBe(401);
  });
});

describe('GET /products', () => {
  it('должен вернуть список продуктов', async () => {
    await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Laptop', price: 1200 });

    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(1);
  });
});

describe('GET /products/:id', () => {
  it('должен вернуть продукт по id', async () => {
    const created = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Phone', price: 800 });

    const id = created.body.product.id;

    const res = await request(app)
      .get(`/products/${id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.product.id).toBe(id);
  });

  it('должен вернуть 404 если продукт не существует', async () => {
    const res = await request(app)
      .get('/products/99999')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(404);
  });
});

describe('PUT /products/:id', () => {
  it('админ должен обновить продукт', async () => {
    const created = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Old Name', price: 100 });

    const id = created.body.product.id;

    const res = await request(app)
      .put(`/products/${id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'New Name' });

    expect(res.status).toBe(200);
    expect(res.body.product.name).toBe('New Name');
  });

  it('обычный пользователь должен получить 403', async () => {
    const created = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Laptop', price: 1200 });

    const id = created.body.product.id;

    const res = await request(app)
      .put(`/products/${id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Hacked' });

    expect(res.status).toBe(403);
  });
});

describe('DELETE /products/:id', () => {
  it('админ должен удалить продукт', async () => {
    const created = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'ToDelete', price: 50 });

    const id = created.body.product.id;

    const res = await request(app)
      .delete(`/products/${id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  it('обычный пользователь должен получить 403', async () => {
    const created = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Laptop', price: 1200 });

    const id = created.body.product.id;

    const res = await request(app)
      .delete(`/products/${id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});