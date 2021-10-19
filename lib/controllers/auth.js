const { Router } = require('express');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth.js');
const { getGoogleAuthURL, getTokens, fetchGoogleUser } = require('../utils/authHelper.js');

module.exports = Router()

  .get('/login', async (req, res, next) => {
    try {
      const googleAuthURL = await getGoogleAuthURL();
      res.redirect(googleAuthURL);
    } catch (error) {
      console.log('ERROR', error);
      next(error);
    }
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const code = req.query.code;
      const { id_token, access_token } = await getTokens({
        code,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
      });
      const user = await fetchGoogleUser(id_token, access_token);
      const newUser = {
        email: user.email,
        name: user.name,
        picture: user.picture
      };
      const token = jwt.sign(newUser, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.cookie('session', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });
      res.redirect(process.env.GOOGLE_CALLBACK_URI);
    } catch(error) {
      next(error);
    }
  })

  .get('/login/user', ensureAuth, async (req, res, next) => {
    try {
      console.log('/login/user', req.user);
      res.send('hello from /login/user');
    } catch (error) {
      next(error);
    }
  });
 

