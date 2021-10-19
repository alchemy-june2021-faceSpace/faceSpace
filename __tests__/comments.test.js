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
    };
    next();
  };
});

const standardUser = {
  username: 'test-commenter',
  avatar: 'image.png',
};

describe('faceSpace /comments routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should POST a new comment', async () => {
    const user = await User.insert(standardUser);

    const res = await request(app).post('/comments').send({
      comment: 'blah-blah',
      post_id: '1',
    });

    expect(res.body).toEqual({
      id: '1',
      username: user.username,
      comment: 'blah-blah',
      post_id: '1',
    });
  });
});
