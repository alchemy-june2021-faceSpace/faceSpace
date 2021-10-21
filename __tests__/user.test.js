const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User.js');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user',
      email: 'blah@blah.com',
      avatar: 'image.png',
    };
    next();
  };
});

const standardUser = {
  username: 'test-user',
  email: 'blah@blah.com',
  avatar: 'image.png',
};

describe('faceSpace /comments routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('updates a user by their id', async () => {
    await User.insert(standardUser);

    const res = await request(app)
      .put('/user/1')
      .send({
        username: 'test-user',
        avatar: 'image-2.png',
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'test-user',
      email: 'blah@blah.com',
      avatar: 'image-2.png',
    });
  });

  it('should delete the users profile returning the deleted user', async () => {
    await User.insert(standardUser);

    const res = await request(app)
      .delete('/user/1');

    expect(res.body).toEqual({
      id: '1',
      username: 'test-user',
      email: 'blah@blah.com',
      avatar: 'image.png',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
