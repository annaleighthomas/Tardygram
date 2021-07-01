import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';
import Comment from '../lib/models/Comment.js';


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
        postId: post.id,
        comment: 'what a cuuuuute kitty'
      });

    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      postId: post.id,
      comment: 'what a cuuuuute kitty'
    });
  });

  it('deletes a comment using DELETE', async () => {
    post = await Post.insert({
      userId: user.id,
      photoUrl: 'http://placekitten.com/200/300',
      caption: 'its a cute',
      tags: ['cool kat', 'nice'] 
    });

    const comment = await Comment.insert({
      id: '1',
      commentBy: user.id, 
      post_id: post.id,
      comment: 'cute kitty'
    });

    const res = await agent 
      .delete(`/api/v1/comments/${comment.id}`)
      .send(comment);

    expect(res.body).toEqual(comment);
  });
});
