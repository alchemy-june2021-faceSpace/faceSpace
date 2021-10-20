const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Like = require('../models/Like');
const LikeService = require('../services/LikeService.js');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const newLike = await LikeService.addNewLike({ ...req.body, userEmail });
      res.send(newLike);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const like = await Like.getById(id);
      res.send(like);
    } catch (error) {
      next(error);
    }
  });
