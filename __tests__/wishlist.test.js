const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const request = require('supertest');
const app = require('../lib/app.js');

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
  username: 'test-user',
  email: 'test-email@email.com',
  avatar: 'image.png',
};

describe('faceSpace routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts to user wishlist', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'text-here',
        price: 15.50,
        photo: 'media.gif'
      });
    // await Listing.insert(testListing);
    const res = await request(app)
      .post('/wishlist')
      .send({
        itemId: '1'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      itemId: expect.any(String),
      userId: expect.any(String),
    });
  });
    
  it('should get wishlist item by id', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'text-here',
        price: 15.50,
        photo: 'media.gif'
      });
    await request(app)
      .post('/wishlist')
      .send({
        itemId: '1'
      });
    const res = await request(app).get('/wishlist/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      itemId: expect.any(String),
      userId: expect.any(String),
    });
  });
  
  it('should delete a wishlist item by id and return the deleted item', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'text-here',
        price: 15.50,
        photo: 'media.gif'
      });
    await request(app)
      .post('/wishlist')
      .send({
        itemId: '1'
      });
      
    const res = await request(app)
      .delete('/wishlist/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      itemId: expect.any(String),
      userId: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
