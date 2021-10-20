const { Router } = require('express');
const Comment = require('../models/Comment.js');
const ensureAuth = require('../middleware/ensureAuth');
const CommentService = require('../services/CommentService.js');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const comment = await CommentService.newComment({
        ...req.body,
        userEmail,
      });
      res.send(comment);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const comment = await Comment.getById(id);
      res.send(comment);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const comments = await Comment.getAll();
      res.send(comments);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedComment = await Comment.deleteById(id);
      res.send(deletedComment);
    } catch (error) {
      next(error);
    }
  });
