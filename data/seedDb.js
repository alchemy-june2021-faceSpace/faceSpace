const pool = require('../lib/utils/pool.js');
const {
  users,
  posts,
  comments,
  likes,
  listings,
  wishlist,
  categories,
  purchases,
} = require('../lib/utils/fakeData.js');

module.exports = async () => {
  const userEmails = [];

  const getRandomUserId = () => {
    return Math.ceil(Math.random() * userEmails.length).toString();
  };

  // users
  for (let i = 0; i < 1234; i++) {
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

  // posts
  for (let i = 0; i < 8000; i++) {
    const randomUserId = getRandomUserId();
    const fakePost = posts(randomUserId);
    await pool.query(
      'INSERT INTO posts (user_id, media_url, text) VALUES ($1, $2, $3)',
      [fakePost.user_id, fakePost.media_url, fakePost.text]
    );
  }

  // comments
  for (let i = 0; i < 60000; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString();
    const randomUserId = getRandomUserId();
    const fakeComment = comments(randomUserId, randomPostId);
    await pool.query(
      'INSERT INTO comments (user_id, comment, post_id) VALUES ($1, $2, $3)',
      [fakeComment.user_id, fakeComment.comment, fakeComment.post_id]
    );
  }

  // likes
  for (let i = 0; i < 86700; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString();
    const randomUserId = getRandomUserId();
    const fakeLike = likes(randomUserId, randomPostId);
    await pool.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [
      fakeLike.user_id,
      fakeLike.post_id,
    ]);
  }

  // listings
  for (let i = 0; i < 2000; i++) {
    const randomUserId = Math.ceil(Math.random() * 5).toString();
    const randomCategoryId = Math.ceil(Math.random() * 50).toString();
    const fakeListing = listings(randomUserId, randomCategoryId);
    await pool.query(
      'INSERT INTO listings (user_id, description, price, photo, ) VALUES ($1, $2, $3, $4)',
      [
        fakeListing.user_id,
        fakeListing.description,
        fakeListing.price,
        fakeListing.photo,
      ]
    );
  }

  // wishlists
  for (let i = 0; i < 5500; i++) {
    const randomItemId = Math.ceil(Math.random() * 30).toString();
    const randomUserId = getRandomUserId();
    const fakeWishlist = wishlist(randomItemId, randomUserId);
    await pool.query(
      'INSERT INTO wishlist (item_id, user_id) VALUES ($1, $2)',
      [fakeWishlist.item_id, fakeWishlist.user_id]
    );
  }

  // purchases
  for (let i = 0; i < 4000; i++) {
    const randomUserId = getRandomUserId();
    const randomItemId = Math.ceil(Math.random() * 30).toString();
    const fakePurchase = purchases(randomUserId, randomItemId);
    await pool.query(
      'INSERT INTO purchases (user_id, item_id, cost) VALUES ($1, $2, $3)',
      [fakePurchase.user_id, fakePurchase.item_id, fakePurchase.cost]
    );
  }

  // categories
  for (let i = 0; i < 50; i++) {
    const fakeCategory = categories();
    await pool.query('INSERT INTO categories (category) VALUES ($1)', [
      fakeCategory.category,
    ]);
  }
};
