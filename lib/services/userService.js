const { getTokens, fetchGoogleUser } = require('../utils/authHelper.js');
const User = require('../models/User.js');

module.exports = class UserService {
  static async create(code){
    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    const user = await fetchGoogleUser(id_token, access_token);
    // const newUser = {
    //   username: user.name,
    //   email: user.email,
    //   avatar: user.picture
    // };
    console.log(user.email);
    let profile = await User.findByEmail(user.email);
    console.log('PROFILE', profile);
    if (!profile) {
      profile = await User.insert({
        username: user.name,
        email: user.email,
        avatar: user.picture
      });
    }
    return profile;
  }
};
