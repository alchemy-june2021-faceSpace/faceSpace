const pool = require('../lib/utils/pool.js');
const {
  users,
  posts,
  comments,
  likes,
  listings,
  wishlist,
  purchases,
} = require('../lib/utils/fakeData.js');

const userEmails = [];

const getRandomUserId = () => {
  if (userEmails.length)
    return Math.ceil(Math.random() * userEmails.length).toString();
};

const seedUsersTable = async () => {
  for (let i = 0; i < 500; i++) {
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
};

const seedPostsTable = async () => {
  for (let i = 0; i < 4000; i++) {
    const randomUserId = getRandomUserId();
    const fakePost = posts(randomUserId);
    await pool.query(
      'INSERT INTO posts (user_id, media_url, text) VALUES ($1, $2, $3)',
      [fakePost.user_id, fakePost.media_url, fakePost.text]
    );
  }
};

const seedCommentsTable = async () => {
  for (let i = 0; i < 8000; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString();
    const randomUserId = getRandomUserId();
    const fakeComment = comments(randomUserId, randomPostId);
    await pool.query(
      'INSERT INTO comments (user_id, comment, post_id) VALUES ($1, $2, $3)',
      [fakeComment.user_id, fakeComment.comment, fakeComment.post_id]
    );
  }
};

const seedLikesTable = async () => {
  for (let i = 0; i < 8600; i++) {
    const randomPostId = Math.ceil(Math.random() * 20).toString();
    const randomUserId = getRandomUserId();
    const fakeLike = likes(randomUserId, randomPostId);
    await pool.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [
      fakeLike.user_id,
      fakeLike.post_id,
    ]);
  }
};

const seedListingsTable = async () => {
  for (let i = 0; i < 800; i++) {
    const randomUserId = Math.ceil(Math.random() * 500).toString();
    const randomCategoryId = Math.ceil(Math.random() * 12).toString();
    const fakeListing = listings(randomUserId, randomCategoryId);
    await pool.query(
      'INSERT INTO listings (user_id, description, price, photo, category_id) VALUES ($1, $2, $3, $4, $5)',
      [
        fakeListing.user_id,
        fakeListing.description,
        fakeListing.price,
        fakeListing.photo,
        fakeListing.category_id,
      ]
    );
  }
};

const seedWishlistTable = async () => {
  for (let i = 0; i < 300; i++) {
    const randomItemId = Math.ceil(Math.random() * 800).toString();
    const randomUserId = Math.ceil(Math.random() * 500).toString();
    const fakeWishlist = wishlist(randomItemId, randomUserId);
    await pool.query(
      'INSERT INTO wishlist (item_id, user_id) VALUES ($1, $2)',
      [fakeWishlist.item_id, fakeWishlist.user_id]
    );
  }
};

const seedPurchasesTable = async () => {
  for (let i = 0; i < 100; i++) {
    const randomUserId = Math.ceil(Math.random() * 500).toString();
    const randomItemId = Math.ceil(Math.random() * 800).toString();
    const fakePurchase = purchases(randomUserId, randomItemId);
    await pool.query(
      'INSERT INTO purchases (user_id, item_id, cost) VALUES ($1, $2, $3)',
      [fakePurchase.user_id, fakePurchase.item_id, fakePurchase.cost]
    );
  }
};

module.exports = {
  seedUsersTable,
  seedPostsTable,
  seedCommentsTable,
  seedLikesTable,
  seedListingsTable,
  seedWishlistTable,
  seedPurchasesTable,
};
