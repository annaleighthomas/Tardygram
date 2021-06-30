import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

const kitten = { 
  photoUrl: 'http://placekitten.com/200/300',
  caption: 'its a kitten',
  tags: '#kitten' };

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a post vis POST', async () => {
    const res = await agent 
      .post('/api/v1/post')
      .send(kitten);

    expect(res.body).toEqual({
      id: 1,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a kitten',
      tags: '#kitten'
    });
  });
});
