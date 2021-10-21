const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth.js');
const UserService = require('../services/userService.js');
const { getGoogleAuthURL } = require('../utils/authHelper.js');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try {
      const googleAuthURL = await getGoogleAuthURL();
      res.redirect(googleAuthURL);
    } catch (error) {
      next(error);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const code = req.query.code;
      const user = await UserService.create(code);

      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });

      res.redirect(process.env.GOOGLE_CALLBACK_URI);
    } catch (error) {
      next(error);
    }
  })

  .get('/login/user', ensureAuth, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });
