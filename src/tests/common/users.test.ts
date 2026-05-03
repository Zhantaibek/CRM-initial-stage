import request from 'supertest';
import app from '../../app';
import { prisma } from '../../config/db';

let adminToken: string;
let userToken: string;
let userId: number;

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@users.com', 'user@users.com'] } }
  });

  const bcrypt = await import('bcrypt');
  const hashed = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@users.com', password: hashed, role: 'admin' }
  });

  const user = await prisma.user.create({
    data: { name: 'User', email: 'user@users.com', password: hashed, role: 'user' }
  });

  userId = user.id;

  const adminRes = await request(app)
    .post('/auth/login')
    .send({ email: 'admin@users.com', password: '123456' });

  const userRes = await request(app)
    .post('/auth/login')
    .send({ email: 'user@users.com', password: '123456' });

  adminToken = adminRes.body.accessToken;
  userToken = userRes.body.accessToken;
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: ['admin@users.com', 'user@users.com'] } }
  });
  await prisma.$disconnect();
});

describe('GET /users', () => {
  it('админ должен получить список всех пользователей', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('обычный пользователь должен получить 403', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it('без токена должен получить 401', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(401);
  });
});

describe('GET /users/me', () => {
  it('пользователь должен получить свои данные', async () => {
    const res = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('user@users.com');
  });

  it('без токена должен получить 401', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(401);
  });
});

describe('PATCH /users/me', () => {
  it('пользователь должен обновить своё имя', async () => {
    const res = await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Updated Name' });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated Name');
  });

  it('должен вернуть 400 если name слишком короткий', async () => {
    const res = await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'A' });

    expect(res.status).toBe(400);
  });

  it('без токена должен получить 401', async () => {
    const res = await request(app)
      .patch('/users/me')
      .send({ name: 'Test' });

    expect(res.status).toBe(401);
  });
});

describe('GET /users/:id', () => {
  it('админ должен получить пользователя по id', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user.id).toBe(userId);
  });

  it('должен вернуть 404 если пользователь не существует', async () => {
    const res = await request(app)
      .get('/users/99999')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
  });

  it('обычный пользователь должен получить 403', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
});

describe('DELETE /users/:id', () => {
  it('обычный пользователь не может удалить пользователя', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it('без токена должен получить 401', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`);

    expect(res.status).toBe(401);
  });
});