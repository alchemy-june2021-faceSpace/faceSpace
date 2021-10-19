const pool = require('./pool.js');
const { users, posts, comments, likes } = require('./fakeData.js');

module.exports = async () => {
  const userNames = [];
  // adding users to the DB
  for (let i = 0; i < 5; i++) {
    const fakeUser = users();
    userNames.push(fakeUser.google_username);
    await pool.query(
      'INSERT INTO users (google_username, google_avatar_url) VALUES ($1, $2)',
      [fakeUser.google_username, fakeUser.google_avatar_url]
    );
  }
  // adding posts to the DB
  for (let i = 0; i < 20; i++) {
    const randomUser = Math.floor(Math.random() * userNames.length);
    const fakePost = posts(userNames[randomUser]);
    await pool.query(
      'INSERT INTO posts (username, media_url, text) VALUES ($1, $2, $3)',
      [fakePost.username, fakePost.media_url, fakePost.text]
    );
  }
  // adding comments to the DB
  // for (let i = 0; i < 60; i++) {
  //   const randomPostId = Math.ceil(Math.random() * 20); // the random number * num needs to be the total number of posts
  //   const randomUser = Math.floor(Math.random() * userNames.length);
  //   const fakeComment = comments(randomUser, randomPostId);
  //   await pool.query(
  //     'INSERT INTO comments (username, comment, post_id) VALUES ($1, $2, $3)',
  //     [fakeComment.username, fakeComment.comment, fakeComment.post_id]
  //   );
  // }
  // adding likes to the DB
  // for (let i = 0; i < 867; i++) {
  //   const randomPostId = Math.ceil(Math.random() * 20).toString(); // the random number * num needs to be the total number of posts
  //   const randomUser = Math.floor(Math.random() * userNames.length);
  //   const fakeLike = likes(randomUser, randomPostId);
  //   await pool.query('INSERT INTO likes (username, post_id) VALUES ($1, $2)', [
  //     fakeLike.username,
  //     fakeLike.post_id,
  //   ]);
  // }
};
