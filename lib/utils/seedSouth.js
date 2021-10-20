const pool = require('./pool.js');
const { users, listings } = require('./fakeData.js');

module.exports = async () => {
  const userEmails = [];
  // adding users to the DB
  for (let i = 0; i < 5; i++) {
    const fakeUser = users();
    userEmails.push(fakeUser.google_email);
    await pool.query(
      'INSERT INTO users (google_username, google_email, google_avatar_url) VALUES ($1, $2, $3)',
      [fakeUser.google_username, fakeUser.google_email, fakeUser.google_avatar_url]
    );
  }

  // listings
  for(let i = 0; i < 10; i++) {
    const randomUserId = Math.ceil(Math.random() * 5).toString();
    const fakeListing = listings();
    await pool.query(
      'INSERT INTO listings (user_id, description, price, photo) VALUES ($1, $2, $3, $4)',
      [randomUserId, fakeListing.description, fakeListing.price, fakeListing.photo]
    );
  }
};
