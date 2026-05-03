import request from 'supertest';
import app from '../../app';
import { prisma } from '../../config/db';

const testUser = {
  name: 'Test User',
  email: 'test@test.com',
  password: '123456',
};

beforeEach(async () => {
  await prisma.user.deleteMany({ where: { email: testUser.email } });
});
    
afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /auth/signup', () => {
  it('должен создать пользователя и вернуть 201', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
  });

  it('должен вернуть 409 если email уже занят', async () => {
    await request(app).post('/auth/signup').send(testUser);

    const res = await request(app)
      .post('/auth/signup')
      .send(testUser);

    expect(res.status).toBe(409);
  });
});

describe('POST /auth/login', () => {
  it('должен вернуть accessToken и refreshToken', async () => {
    await request(app).post('/auth/signup').send(testUser);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('должен вернуть 401 при неверном пароле', async () => {
    await request(app).post('/auth/signup').send(testUser);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
  });

  it('должен вернуть 401 если пользователь не существует', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'nobody@test.com', password: '123456' });

    expect(res.status).toBe(401);
  });
});

describe('POST /auth/logout', () => {
  it('должен разлогинить пользователя', async () => {
    await request(app).post('/auth/signup').send(testUser);

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    const { accessToken } = loginRes.body;

    const res = await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logged out successfully');
  });

  it('должен вернуть 401 без токена', async () => {
    const res = await request(app).post('/auth/logout');
    expect(res.status).toBe(401);
  });
});