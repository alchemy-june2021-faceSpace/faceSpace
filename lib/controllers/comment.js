const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const CommentService = require('../services/CommentService.js');

module.exports = Router().post('/', ensureAuth, async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const comment = await CommentService.newComment({ ...req.body, userEmail });
    res.send(comment);
  } catch (error) {
    next(error);
  }
});
