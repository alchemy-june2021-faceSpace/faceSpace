const faker = require('faker');
const txtgen = require('txtgen');

const users = () => {
  return {
    google_username: `${faker.name.firstName()} ${faker.name.lastName()}`,
    google_email: faker.internet.email(),
    google_avatar_url: faker.image.imageUrl(),
  };
};

const posts = (userId) => {
  return {
    user_id: userId,
    media_url: faker.image.imageUrl(),
    text: txtgen.sentence(),
  };
};

const comments = (userId, randomPostId) => {
  return {
    user_id: userId,
    comment: txtgen.sentence(),
    post_id: randomPostId,
  };
};

const likes = (userId, randomPostId) => {
  return {
    user_id: userId,
    post_id: randomPostId,
  };
};

const listings = (userId) => {
  return {
    user_id: userId,
    description: txtgen.sentence(),
    price: faker.commerce.price(),
    photo: faker.image.imageUrl(),
    // category_id: ''
  };
};

const wishlist = (itemId, userId) => {
  return {
    item_id: itemId,
    user_id: userId,
  };
};

// const purchases = (userId, itemId) => {
//   return {
//     user_id: userId,
//     item_id: itemId,
//     cost: faker.commerce.price(),
//   };
// };

module.exports = { users, posts, comments, likes, listings, wishlist };
