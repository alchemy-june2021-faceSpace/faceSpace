const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const app = require('../lib/app.js');
const request = require('supertest');
const seedSouth = require('../lib/utils/seedSouth.js');
// const Listing = require('../lib/models/Listing.js');

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
    // await seedSouth();
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
      //commentId: ' '
    });
  });

  it('gets a listing by its id', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'testing a get route',
        price: 1.99,
        photo: 'www.fake-photo.com'
      });
    const res = await request(app)
      .get('/listings/1');
    
    expect(res.body).toEqual({
      id: '1',
      userId: expect.any(String),
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String)
      // commentId: ''
    });
  });

  it('should update a listing by id', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'GREAT BUY',
        price: '$1.50',
        photo: 'image.png'
      });
    
    const res = await request(app)
      .put('/listings/1')
      .send({
        description: 'Great Item',
        price: '$14.50',
        photo: 'www.image.png'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'Great Item',
      price: '$14.50',
      photo: 'www.image.png'
      //commentId: ' '
    });
  });

  it('deletes listing but it\'s id', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'GREAT BUY',
        price: '$1.50',
        photo: 'image.png'
      });
    const res = await request(app)
      .delete('/listings/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'GREAT BUY',
      price: '$1.50',
      photo: 'image.png'
      //commentId: ' '
    });
  });

  afterAll(() => {
    pool.end();
  });
});
