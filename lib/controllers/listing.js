const { Router } = require('express');
const Listing = require('../models/Listing.js');
const ensureAuth = require('../middleware/ensureAuth');
const ListingService = require('../services/ListingService.js');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const listing = await ListingService.create({ userEmail, ...req.body });
      res.send(listing);
    } catch (error) {
      next(error);
    }
  })
  .get('/category/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const list = await Listing.getCategory(id);
      res.send(list);
    } catch (error) {
      next(error);
    }
  })
  .get('/price-low-to-high', async (req, res, next) => {
    try {
      const organize = await Listing.priceLowToHigh();
      res.send(organize);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const listing = await Listing.getById(id);
      res.send(listing);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const putListing = await ListingService.updateListing(id, userEmail, req.body);
      res.send(putListing);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const deleteListing = await ListingService.removeListing(id, userEmail, req.body);
      res.send(deleteListing);
    } catch (error) {
      next(error);
    }
  });
