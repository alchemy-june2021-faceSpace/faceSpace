const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user-phone',
      email: 'blah-phone@blah.com',
      avatar: 'image-phone.png',
    };
    next();
  };
});

const standardUser = {
  username: 'test-user-phone',
  email: 'blah-phone@blah.com',
  avatar: 'image-phone.png',
};

describe('faceSpace /user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('updates a user by their id', async () => {
    await User.insert(standardUser);

    const res = await request(app)
      .put('/user/1')
      .send({
        username: 'test-user-phone1',
        avatar: 'image-2.png',
        phone: 3601234567
      });

    expect(res.body).toEqual({
      id: '1',
      username: expect.any(String),
      email: expect.any(String),
      avatar: expect.any(String),
      phone: '3601234567'
    });
  });

  it('should delete the users profile returning the deleted user', async () => {
    await User.insert(standardUser);

    const res = await request(app)
      .delete('/user/1');
    console.log('RES', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      avatar: expect.any(String),
      phone: null
    });
  });

  afterAll(() => {
    pool.end();
  });
});
