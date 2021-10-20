const { Router } = require('express');
const Listing = require('../models/Listing.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
    try {
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const listing = await Listing.insert({ ...req.body, userId });
      res.send(listing);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const listing = await Listing.getById(id);
      res.send(listing);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', ensureAuth, async(req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const putListing = await Listing.update(id, userId.id, req.body);
      console.log('AT LISTING CONTROLLER', id);
      res.send(putListing);
    } catch (error) {
      next(error);
    }
  });
