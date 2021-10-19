const { Router } = require('express');
const { URLSearchParams } = require('url');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth.js');

function getGoogleAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  return `${rootUrl}?${new URLSearchParams(options).toString()}`;

}

const url = 'https://oauth2.googleapis.com/token';

async function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}){
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  };
  const params = await new URLSearchParams(values).toString();

  return axios
    .post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Failed to fetch auth tokens');
      throw new Error(error.message);
    });
}

async function fetchGoogleUser(id_token, access_token){
  return await axios
    .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      })
    .then((res) => {return res.data;})
    .catch((error) => {
      throw new Error(error.message);
    });}

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

      console.log('USER', user);
      res.redirect(process.env.GOOGLE_CALLBACK_URI);
    } catch(error) {
      next(error);
    }
  
    //Add Token/Cookies here
  })

  .get('/login/user', ensureAuth, async (req, res, next) => {
    try {
      console.log('/login/user', req.user);
      res.send('hello from /login/user');
    } catch (error) {
      next(error);
    }
  });
 

