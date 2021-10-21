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
        userEmail,
      });
      res.send(purchase);
    } catch (error) {
      next(error);
    }
  })

  .get('/my-purchases', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const purchase = await Purchase.getMyPurchases(userEmail);
      res.send(purchase);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const purchase = await Purchase.getById(id);
      res.send(purchase);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const removePurchase = await Purchase.remove(id);
      res.send(removePurchase);
    } catch (error) {
      next(error);
    }
  });
