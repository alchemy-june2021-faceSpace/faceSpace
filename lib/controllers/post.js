const { Router } = require('express');
const Post = require('../models/Post.js');
const ensureAuth = require('../middleware/ensureAuth');
const PostService = require('../services/PostService.js');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const post = await PostService.addNewPost({ ...req.body, userEmail });
      res.send(post);
    } catch (error) {
      next(error);
    }
  })

  
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch (error) {
      next(error);
    }
  })

  .get('/details/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const post = await Post.getDetails(id);
      res.send(post);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/likes/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const count = await Post.countLikes(id);
      res.send(count);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const post = await Post.getById(id);
      res.send(post);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedPost = await Post.updateById({
        ...req.body,
        id,
      });
      res.send(updatedPost);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedPost = await Post.deleteById(id);
      res.send(deletedPost);
    } catch (error) {
      next(error);
    }
  });
