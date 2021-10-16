const { Router } = require('express');
const fetch = require('cross-fetch');
const { google } = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');



module.exports = Router()

  .get('/login', (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ];
      const url = oauth2Client.generateAuthUrl({
        access_type: 'online',
        scope: scopes
      });
    // res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=profile&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code
    `);
  })
  .get('/login/callback', async () => {
    
  });


//   const user = await UserService.create(req.query.code);
//    const code = req.query.code;
//    const tokenResponse = await fetch(`https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_CALLBACK_URI}`,
//      {
//        method: 'POST',
//        headers: {
//          Host: 'oauth2.googleapis.com',
//          'Content-Type': 'application/x-www-form-urlencoded',
//        },
//        body: {
//          code,
//          client_id: process.env.GOOGLE_CLIENT_ID,
//          client_secret: process.env.GOOGLE_CLIENT_SECRET,
//          redirect_uri: process.env.GOOGLE_CALLBACK_URI,
//          grant_type: 'authorization_code'
//        }
//      }
//    );
//    res.send(tokenResponse);
