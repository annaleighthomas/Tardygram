import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'nelly@504.com',
        password: 'qwerty'
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'nelly@504.com'
    });
  });

  it('login a user via POST', async() => {
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'nelly@504.com',
        password: 'qwerty'
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'nelly@504.com'
    });
  });

  // it('checks to see if a user is logged in', async () => {
  //   const agent = request.agent(app);
  //   const user = await UserService.create({
  //     username: 'nelly',
  //     password: 'password',
  //     profilePhotoUrl: 'https://pic.com'
  //   });

  //   await agent
  //     .post('/api/v1/auth/login')
  //     .send({
  //       username: 'nelly',
  //       password: 'password'
  //     });

  //   const res = await agent
  //     .get('/api/v1/verify');

  //   expect(res.body).toEqual({
  //     id: user.id,
  //     username: 'nelly',
  //     passwordHash: expect.any(String),
  //     profilePhotoUrl: 'https://pic.com',
  //     iat: expect.any(Number),
  //     exp: expect.any(Number)
  //   });
  // });
});
