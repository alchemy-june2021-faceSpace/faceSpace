const { Router } = require('express');
const Post = require('../models/Post.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const username = req.user.username;
      const post = await Post.insert({ ...req.body, username });
      res.send(post);
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

  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
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
  });
