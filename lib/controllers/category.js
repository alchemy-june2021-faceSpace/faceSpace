const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Category = require('../models/Category');
const CategoryService = require('../services/CategoryService.js');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const categoryInput = await CategoryService.create({ ...req.body });
      res.send(categoryInput);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const categories = await Category.getAll();
      res.send(categories);
    } catch (error) {
      next(error);
    }
  });

