const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router()

  .get('/login', (req, res) => {
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=profile&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code
    `);
  })
  .get('/login/callback', async (req, res, next) => {
    try {
    //   const user = await UserService.create(req.query.code);
      const code = req.query.code;
      const tokenResponse = await fetch(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri`
      //need redirectURI after authtoken fetch is called
      );
    //   res.send(user);
    } catch (error) {
      next(error);
    }
  });
