const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
// const { request } = require('express');
const app = require('../lib/app.js');
const request = require('supertest');
const seedDb = require('../lib/utils/seedDb.js');
const seedSouth = require('../lib/utils/seedSouth.js');
// const app = require('../lib/app.js');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user',
      email: 'test-email@email.com',
      avatar: 'image.png',
    };
  
    next();
  };
});

const standardUser = {
  id: '1',
  username: 'test-user',
  email: 'test-email@email.com',
  avatar: 'image.png',
};

describe.only('faceSpace routes', () => {
  beforeAll(async () => {
    await setup(pool);
    await seedSouth();
  });

  it('posts a new listing to table', async () => {
    await User.insert(standardUser);

    const res = await request(app)
      .post('/listings')
      .send({
        description: 'good item',
        price: 12.50,
        photo: 'image.png'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'good item',
      price: '$12.50',
      photo: 'image.png'
    });
  });

  it('gets a listing by its id', async () => {
    // const user = await User.insert(standardUser);
    const res = await request(app)
      .get('/listings/8');
    console.log('AT LISTING ID TEST', res.body);
    expect(res.body).toEqual({
      id: '8',
      userId: expect.any(String),
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String)
      // commentId: ''
    });
  });

  afterAll(() => {
    pool.end();
  });
});
