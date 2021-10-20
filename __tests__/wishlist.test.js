const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Listing = require('../lib/models/Listing.js');
const seedSouth = require('../lib/utils/seedSouth.js');

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

// const testListing = {
//   description: 'testing a get route',
//   price: '$1.99',
//   photo: 'www.fake-photo.com'
// };

describe('faceSpace routes', () => {
  beforeEach(async() => {
    // await seedSouth();
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
      id: '1',
      itemId: '1',
      userId: '1',
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
      id: '1',
      itemId: '1',
      userId: '1',
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
      
    console.log('AT WISH TEST', res.body);
    expect(res.body).toEqual({
      id: '1',
      itemId: '1',
      userId: '1',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
