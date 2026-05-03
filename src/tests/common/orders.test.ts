import request from 'supertest';
import app from '../../app';
import { prisma } from '../../config/db';

let adminToken: string;
let userToken: string;
let otherUserToken: string;
let productId: number;

beforeAll(async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@orders.com', 'user@orders.com', 'other@orders.com'] } }
  });

  const bcrypt = await import('bcrypt');
  const hashed = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@orders.com', password: hashed, role: 'admin' }
  });
  await prisma.user.create({
    data: { name: 'User', email: 'user@orders.com', password: hashed, role: 'user' }
  });
  await prisma.user.create({
    data: { name: 'Other', email: 'other@orders.com', password: hashed, role: 'user' }
  });

  const adminRes = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@orders.com', password: '123456' });

  const userRes = await request(app)
    .post('/auth/login')
    .send({ email: 'user@orders.com', password: '123456' });

  const otherRes = await request(app)
    .post('/auth/login')
    .send({ email: 'other@orders.com', password: '123456' });

  adminToken = adminRes.body.accessToken;
  userToken = userRes.body.accessToken;
  otherUserToken = otherRes.body.accessToken;

  // Создаём продукт для тестов заказов
  const product = await prisma.product.create({
    data: { name: 'Test Product', price: 100 }
  });
  productId = product.id;
});

beforeEach(async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
});

afterAll(async () => {
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@orders.com', 'user@orders.com', 'other@orders.com'] } }
  });
  await prisma.$disconnect();
});

describe('POST /orders', () => {
  it('пользователь должен создать заказ и получить 201', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('должен вернуть 400 если productIds пустой', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [] });

    expect(res.status).toBe(400);
  });

  it('должен вернуть 401 без токена', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ productIds: [productId] });

    expect(res.status).toBe(401);
  });
});

describe('GET /orders', () => {
  it('админ должен видеть все заказы', async () => {
    await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('обычный пользователь должен получить 403', async () => {
    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});

describe('GET /orders/my', () => {
  it('пользователь видит только свои заказы', async () => {
    await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    // Другой пользователь тоже создаёт заказ
    await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${otherUserToken}`)
      .send({ productIds: [productId] });

    const res = await request(app)
      .get('/orders/my')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    // Видит только свой один заказ, не чужой
    expect(res.body).toHaveLength(1);
  });
});

describe('GET /orders/:id', () => {
  it('пользователь видит свой заказ', async () => {
    const created = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    const id = created.body.id;

    const res = await request(app)
      .get(`/orders/${id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it('пользователь не видит чужой заказ и получает 403', async () => {
    const created = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    const id = created.body.id;

    const res = await request(app)
      .get(`/orders/${id}`)
      .set('Authorization', `Bearer ${otherUserToken}`);

    expect(res.status).toBe(403);
  });

  it('должен вернуть 404 если заказ не существует', async () => {
    const res = await request(app)
      .get('/orders/99999')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
  });
});

describe('DELETE /orders/:id', () => {
  it('админ должен удалить заказ', async () => {
    const created = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    const id = created.body.id;

    const res = await request(app)
      .delete(`/orders/${id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  it('обычный пользователь не может удалить заказ', async () => {
    const created = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productIds: [productId] });

    const id = created.body.id;

    const res = await request(app)
      .delete(`/orders/${id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});