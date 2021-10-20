const pool = require('./pool.js');
const {
  users,
  posts,
  comments,
  likes,
  listings,
  wishlist,
} = require('./fakeData.js');

module.exports = async () => {
  const userEmails = [];
  // adding users to the DB
  for (let i = 0; i < 5; i++) {
    const fakeUser = users();
    userEmails.push(fakeUser.google_email);
    await pool.query(
      'INSERT INTO users (google_username, google_email, google_avatar_url) VALUES ($1, $2, $3)',
      [
        fakeUser.google_username,
        fakeUser.google_email,
        fakeUser.google_avatar_url,
      ]
    );
  }
  // adding posts to the DB
  for (let i = 0; i < 20; i++) {
    const randomUserId = Math.ceil(
      Math.random() * userEmails.length
    ).toString();
    const fakePost = posts(randomUserId);
    await pool.query(
      'INSERT INTO posts (user_id, media_url, text) VALUES ($1, $2, $3)',
      [fakePost.user_id, fakePost.media_url, fakePost.text]
    );
  }
  // adding comments to the DB
  for (let i = 0; i < 60; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString(); // the random number * num needs to be the total number of posts
    const randomUserId = Math.ceil(
      Math.random() * userEmails.length
    ).toString();
    const fakeComment = comments(randomUserId, randomPostId);
    await pool.query(
      'INSERT INTO comments (user_id, comment, post_id) VALUES ($1, $2, $3)',
      [fakeComment.user_id, fakeComment.comment, fakeComment.post_id]
    );
  }

  // adding likes to the DB
  for (let i = 0; i < 867; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString(); // the random number * num needs to be the total number of posts
    const randomUserId = Math.ceil(
      Math.random() * userEmails.length
    ).toString();
    const fakeLike = likes(randomUserId, randomPostId);
    await pool.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [
      fakeLike.user_id,
      fakeLike.post_id,
    ]);
  }

  // listings
  for (let i = 0; i < 30; i++) {
    const randomUserId = Math.ceil(Math.random() * 5).toString();
    const fakeListing = listings(randomUserId);
    await pool.query(
      'INSERT INTO listings (user_id, description, price, photo) VALUES ($1, $2, $3, $4)',
      [
        fakeListing.user_id,
        fakeListing.description,
        fakeListing.price,
        fakeListing.photo,
      ]
    );
  }

  // wishlists
  for (let i = 0; i < 55; i++) {
    const randomItemId = Math.ceil(Math.random() * 30).toString();
    const randomUserId = Math.ceil(
      Math.random() * userEmails.length
    ).toString();
    const fakeWishlist = wishlist(randomItemId, randomUserId);
    await pool.query(
      'INSERT INTO wishlist (item_id, user_id) VALUES ($1, $2)',
      [fakeWishlist.item_id, fakeWishlist.user_id]
    );
  }

  //TODO purchases
  //TODO categories
};
