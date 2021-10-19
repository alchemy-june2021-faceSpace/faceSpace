const { URLSearchParams } = require('url');
const axios = require('axios');

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
  const url = 'https://oauth2.googleapis.com/token';
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
    .then((res) => {return res.data;})
    .catch((error) => {
      throw new Error(error.message);
    });}

module.exports = { getGoogleAuthURL, getTokens, fetchGoogleUser };
