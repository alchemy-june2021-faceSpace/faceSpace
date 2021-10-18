const pool = require('./pool.js');
const { users, posts, comments, likes } = require('./fakeData.js');

module.exports = async () => {
  const userNames = [];
  // adding users to the DB
  for (let i = 0; i < 5; i++) {
    const { google_username, google_avatar_url } = users();
    userNames.push(google_username);
    await pool.query(
      'INSERT INTO users (google_username, google_avatar_url) VALUES ($1, $2)',
      [google_username, google_avatar_url]
    );
  }
  // adding posts to the DB
  for (let i = 0; i < 20; i++) {
    const randomUser = Math.floor(Math.random() * userNames.length);
    const { username, media_url, caption } = posts(userNames[randomUser]);
    await pool.query(
      'INSERT INTO posts (username, media_url, caption) VALUES ($1, $2, $3)',
      [username, media_url, caption]
    );
  }
  // adding comments to the DB
  for (let i = 0; i < 60; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString(); // the random number * num needs to be the total number of posts
    const randomUser = Math.floor(Math.random() * userNames.length);
    const { username, comment, post_id } = comments(randomUser, randomPostId);
    await pool.query(
      'INSERT INTO comments (username, comment, post_id) VALUES ($1, $2, $3)',
      [username, comment, post_id]
    );
  }
  // adding likes to the DB
  for (let i = 0; i < 867; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString(); // the random number * num needs to be the total number of posts
    const randomUser = Math.floor(Math.random() * userNames.length);
    const { user_id, post_id } = likes(randomUser, randomPostId);
    await pool.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [
      user_id,
      post_id,
    ]);
  }
};
