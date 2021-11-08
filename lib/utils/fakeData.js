const faker = require('faker');
const txtgen = require('txtgen');

//You can use a combination of both named exports and implicit returns in your functions to refactor your code nicely.
exports.users = () => ({
  google_username: `${faker.name.firstName()} ${faker.name.lastName()}`,
  google_email: faker.internet.email(),
  google_avatar_url: faker.image.imageUrl(),
});

exports.posts = (userId) => ({
  user_id: userId,
  media_url: faker.image.imageUrl(),
  text: txtgen.sentence(),
});

exports.comments = (userId, randomPostId) => ({
  user_id: userId,
  comment: txtgen.sentence(),
  post_id: randomPostId,
});

exports.likes = (userId, randomPostId) => ({
  user_id: userId,
  post_id: randomPostId,
});

exports.listings = (userId, categoryId) => ({
  user_id: userId,
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  photo: faker.image.imageUrl(),
  category_id: categoryId,
});

exports.wishlist = (itemId, userId) => ({
  item_id: itemId,
  user_id: userId,
});

exports.purchases = (userId, itemId) => ({
  user_id: userId,
  item_id: itemId,
  cost: faker.commerce.price(),
});

exports.categories = () => {
  ({
    category: faker.commerce.department(),
  });
};
