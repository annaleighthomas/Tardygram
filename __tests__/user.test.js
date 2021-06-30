import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
});
