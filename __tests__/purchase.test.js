const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user',
      avatar: 'image.png',
      email: 'blah@blah.com',
    };
    next();
  };
});

const standardUser = {
  username: 'test-user',
  avatar: 'image.png',
  email: 'blah@blah.com',
};

describe('faceSpace /purchases routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('should post to purchases table', async () => {
    await User.insert(standardUser);
    await request(app)
      .post('/listings')
      .send({
        description: 'text-here',
        price: 15.50,
        photo: 'media.gif'
      });

    const res = await request(app)
      .post('/purchases')
      .send({
        itemId: '1',
        cost: 15.50
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      itemId: expect.any(String),
      cost: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
