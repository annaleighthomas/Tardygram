import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';
import Comment from '../lib/models/Comment.js';
import User from '../lib/models/User.js';


describe('comment routes', () => {

  let user = {};
  let post = {};
  let agent;

  beforeEach(async () => {
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

  it('creates a comment via POST', async () => {

    post = await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a cute',
      tags: ['cool kat', 'nice'] 
    });

    const res = await agent 
      .post('/api/v1/comments')
      .send({
        commentBy: user.id,
        post: post.id,
        comment: 'what a cuuuuute kitty'
      });
  });
});
