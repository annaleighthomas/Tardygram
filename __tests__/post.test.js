import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';


describe('demo routes', () => {

  let user = {};
  let agent;

  beforeEach(async() => {
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

  it('gets a post via GET', async () => {
    const post1 = await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'another kitten',
      tags: ['kitten', 'cute']
    });

    const post2 = await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'again a kitten',
      tags: ['kitty', 'cool']
    });

    const post3 = await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'kitty kat',
      tags: ['kat', 'wow']
    });

    const res = await agent
      .get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2, post3]);
  });

  it('gets a post by id via GET', async () => {

    const post = await agent.post('/api/v1/posts').send({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a cute',
      tags: ['cool kat', 'nice'] 
    });

    const res = await agent
      .get(`/api/v1/posts/${post.body.id}`);

    expect(res.body).toEqual(post.body);
  });

  it('updates a post via PUT', async () => {
    const post =  await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a cute',
      tags: ['cool kat', 'nice'] 
    });

    post.caption = 'its a cute lil kitten';

    const res = await agent
      .patch(`/api/v1/posts/${post.id}`)
      .send({ caption: 'its a cute lil kitten' });

    expect(res.body).toEqual(post);

  });

  

});
