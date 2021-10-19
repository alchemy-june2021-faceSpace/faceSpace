const faker = require('faker');
const txtgen = require('txtgen');

const users = () => {
  return {
    google_username: `${faker.name.firstName()} ${faker.name.lastName()}`,
    google_email: faker.internet.email(),
    google_avatar_url: faker.image.imageUrl(),
  };
};

const posts = (name) => {
  return {
    username: name,
    media_url: faker.image.imageUrl(),
    text: faker.lorem.sentence(),
  };
};

const comments = (name, randomPostId) => {
  return {
    username: name,
    comment: txtgen.sentence(),
    post_id: randomPostId.toString(),
  };
};

const likes = (name, randomPostId) => {
  return {
    username: name,
    post_id: randomPostId.toString(),
  };
};

const listings = () => {
  return {
    description: txtgen.sentence(),
    price: faker.commerce.price(),
    photo: faker.image.imageUrl(),
    // category_id: ''
  };
};

module.exports = { users, posts, comments, likes, listings };
