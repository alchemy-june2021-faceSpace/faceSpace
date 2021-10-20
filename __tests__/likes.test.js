const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User');

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

describe('faceSpace /likes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should POST a new like on a specific post', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    const res = await request(app).post('/likes').send({ postId: '1' });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      postId: '1',
    });
  });

  it('should get a like by id', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });
    await request(app).post('/likes').send({ postId: '1' });

    const res = await request(app).get('/likes/1');

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      postId: '1',
    });
  });

  it('should delete a like by id, returning the deleted like', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });
    await request(app).post('/likes').send({ postId: '1' });

    const res = await request(app).delete('/likes/1');

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      postId: '1',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
