const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const Purchase = require('../models/Purchase.js');
const PurchaseService = require('../services/PurchaseService');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const purchase = await PurchaseService.create({
        ...req.body,
        userEmail
      });
      res.send(purchase);
    } catch (error) {
      next(error);
    }
  });
