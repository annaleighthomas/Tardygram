import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Post from '../models/Post';

export default Router()
  .post('/api/v1/posts', ensureAuth, (req, res, next) => {
    Post.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/api/v1/posts', (req, res, next) => {
    Post.findPost()
      .then(post => res.send(post))
      .catch(next);
  })
  
  .get('/api/v1/posts/:id', ensureAuth, (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })
  
  .patch('/api/v1/posts/:id', ensureAuth, (req, res, next) => {
    Post.updatePost(req.body, req.params.id)
      .then(post => res.send(post))
      .catch(next);
  });


