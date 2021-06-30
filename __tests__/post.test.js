import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
// import Post from '../lib/models/Post.js';


describe('demo routes', () => {

  let user = {};
  let agent;

  beforeAll(async() => {
    await setup(pool);
    agent = request.agent(app);
    user = await UserService.create({
      username: 'nelly',
      password: 'password',
      profilePhotoUrl: 'http://placekitten.com/200/300'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'nelly',
        password: 'password'
      });
  });

  it('creates a post via POST', async () => {
    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: '1',
        photoUrl: 'http://placekitten.com/200/300',
        caption: 'its a kitten',
        tags: ['kitten', 'lol']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a kitten',
      tags: ['kitten', 'lol']
    });
  });



});
