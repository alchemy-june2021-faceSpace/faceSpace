const { Router } = require('express');
const User = require('../models/User.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  .put('/:id', ensureAuth, async (req, res, next) => {
    try{
      const id = req.params.id;
      const userEmail = req.user.email;
      const putUser = await User.update(id, userEmail, req.body);
      res.send(putUser);
      console.log('ENSURE', req.user);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const userEmail = req.user.email;
      const deleteUser = await User.remove(id, userEmail);
      res.send(deleteUser);
    } catch (error) {
      next(error);
    }
  });


