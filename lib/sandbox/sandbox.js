const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;


passport.use(
  new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    redirect: `${process.env.REDIRECT}`
  })
);
