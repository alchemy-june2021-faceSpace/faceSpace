const { Router } = require('express');
const Post = require('../models/Post.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const username = req.user.username;
      const post = await Post.insert({ ...req.body, username });
      console.log('POST ', post);
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
  });
