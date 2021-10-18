const faker = require('faker');

const users = () => {
  return {
    google_username: `${faker.name.firstName()} ${faker.name.lastName()}`,
    google_avatar_url: faker.image.imageUrl(),
  };
};

const posts = (name) => {
  return {
    username: name,
    media_url: faker.image.imageUrl(),
    caption: faker.lorem.sentence(),
  };
};

const comments = (name, randomPostId) => {
  return {
    username: name,
    comment: faker.lorem.sentence(),
    post_id: randomPostId,
  };
};

const likes = (name, randomPostId) => {
  return {
    user_id: name,
    post_id: randomPostId,
  };
};

module.exports = { users, posts, comments, likes };
