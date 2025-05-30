const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
 
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/login', () => {
  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should fail with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: process.env.TEST_EMAIL,
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(401);
  });
});
