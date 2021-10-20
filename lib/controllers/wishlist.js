const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const WishService = require('../services/WishService');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const newWish = await WishService.create({ ...req.body, userEmail });
      CONSOLE.LOG('WISHLIST CONTROLLER', newWish);
      res.send(newWish);
    } catch (error) {
      next(error);
    }
  });
