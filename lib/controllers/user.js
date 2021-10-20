const { Router } = require('express');
const User = require('../models/User.js');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteUser = await User.remove(id);
      res.send(deleteUser);
    } catch (error) {
      next(error);
    }
  });


