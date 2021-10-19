const { Router } = require('express');
const Listing = require('../models/Listing.js');
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User.js');

module.exports = Router()
  .post('/', ensureAuth, async(req, res, next) => {
    try {
      const userEmail = req.user.email;
      const userId = await Listing.findByEmail(userEmail);
      const listing = await Listing.insert({ ...req.body, userId });
      console.log('AT LISTING CONTROLLER', userEmail, userId, listing);
      res.send(listing);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async(req, res, next) => {
      try {
          const id = req.params.id;
      } catch (error) {
          next(error);
      }
  })
