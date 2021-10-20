const { Router } = require('express');
const Listing = require('../models/Listing.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const listing = await Listing.insert({ ...req.body, userId });
      res.send(listing);
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

<<<<<<< HEAD
  .patch('/:id', ensureAuth, async(req, res, next) => {
=======
  .put('/:id', ensureAuth, async (req, res, next) => {
>>>>>>> dbb134d838e5e03984e51a2f78d6e80297669403
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const putListing = await Listing.update(id, userId.id, req.body);
      res.send(putListing);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const deleteListing = await Listing.remove(id, userId.id);
      res.send(deleteListing);
    } catch (error) {
      next(error);
    }
  });
