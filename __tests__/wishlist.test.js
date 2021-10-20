const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Listing = require('../lib/models/Listing.js');

const standardUser = {
  username: 'test-user',
  email: 'test-email-2@email.com',
  avatar: 'image.png',
};

const testListing = {
  description: 'testing a get route',
  price: '$1.99',
  photo: 'www.fake-photo.com'
};

describe.only('faceSpace routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts to user wishlist', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'text-here',
        price: '15.50',
        photo: 'media.gif'
      });
    await Listing.insert(testListing);

    const res = await request(app)
      .post('/wishlist')
      .send({
        itemId: '1'
      });
    expect(res.body).toEqual({
      itemId: '1',
      userId: '1',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
