const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Wish = require('../models/Wish');
const WishService = require('../services/WishService');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const newWish = await WishService.create({ ...req.body, userEmail });
      res.send(newWish);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try{
      const id = req.params.id;
      const wish = await Wish.getById(id);
      res.send(wish);
    } catch(error){
      next(error);
    }
  })
  
  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const deleteWish = await WishService.removeWish(id, userEmail);
      res.send(deleteWish);
    } catch (error) {
      next(error);
    }
  });
