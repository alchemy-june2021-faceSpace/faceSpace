const { Router } = require('express');
// const ensureAuth = require('../middleware/ensureAuth');
const CategoryService = require('../services/CategoryService.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const categoryInput = await CategoryService.create({ ...req.body });
      res.send(categoryInput);
    } catch (error) {
      next(error);
    }
  });

