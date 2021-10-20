const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const app = require('../lib/app.js');
const request = require('supertest');

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

  it('posts a category using /categories', async () => {
    await User.insert(standardUser);
    const res = await request(app)
      .post('/categories')
      .send({ category: 'Games' });

    expect(res.body).toEqual({
      id: expect.any(String),
      category: expect.any(String)
    });
  });

  afterAll(() => {
    pool.end();
  });
});
