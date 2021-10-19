const { Router } = require('express');
// const fetch = require('cross-fetch');
const { URLSearchParams } = require('url');
const axios = require('axios');
const User = require('../models/User');
// const app = require('../app.js');


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
  const params = new URLSearchParams(values).toString();

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
    .then((res) => res.send(res.data))
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
      const googleFetch = await fetchGoogleUser(id_token, access_token);
      console.log('GOOGLE FETCH', googleFetch);
      const user = await User.insert(googleFetch.res);
      res.redirect(process.env.GOOGLE_CALLBACK_URI);
    } catch(error) {
      next(error);
    }
  
    //Add Token/Cookies here
  });

// .get('/login/callback', async (req, res, next) => {
//   try {
//   //   const user = await UserService.create(req.query.code);
//     const code = req.query.code;
//     const tokenResponse = await fetch(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri`
//     //need redirectURI after authtoken fetch is called
//     );
//   //   res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });
