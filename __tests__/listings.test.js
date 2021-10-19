const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const { request } = require('express');
const app = require('../lib/app.js');
// const request = require('supertest');
// const app = require('../lib/app.js');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user',
      avatar: 'image.png',
    };
  
    next();
  };
});

const standardUser = {
  username: 'test-user',
  avatar: 'image.png',
};

describe.skip('faceSpace routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts a new listing to table', async () => {
    const user = await User.insert(standardUser);

    const res = await request(app)
      .post('/listings')
      .send({
        user_id: '1',
        description: 'good item',
        price: 12.50,
        photo: 'image.png'
      });

    expect(res.body).toEqual({
      id: '1',
      user_id: user.id,
      description: 'good item',
      price: 12.50,
      photo: 'image.png'
    });
  });

  afterAll(() => {
    pool.end();
  });
});
