const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user',
      avatar: 'image.png',
    };

    next();
  };
});

describe('faceSpace /posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  }, 10000);

  it('it should create a new post', async () => {
    const user = await User.insert({
      username: 'test-user',
      avatar: 'image.png',
    });

    const res = await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    expect(res.body).toEqual({
      id: '1',
      username: user.username,
      notifications: false,
      text: 'text-here',
      media: 'media.gif',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
