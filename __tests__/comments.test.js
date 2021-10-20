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

describe('faceSpace /comments routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should POST a new comment', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    const res = await request(app).post('/comments').send({
      comment: 'blah-blah',
      postId: '1',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      comment: 'blah-blah',
      postId: expect.any(String),
    });
  });

  it('should GET a comment by id', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    await request(app).post('/comments').send({
      comment: 'blah-blah',
      postId: '1',
    });

    const res = await request(app).get('/comments/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      comment: expect.any(String),
      postId: expect.any(String),
    });
  });

  it('should GET all comments', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    await request(app).post('/comments').send({
      comment: 'blah-blah',
      postId: '1',
    });

    const res = await request(app).get('/comments');

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          userId: expect.any(String),
          comment: expect.any(String),
          postId: expect.any(String),
        },
      ])
    );
  });

  it('should DELETE a comment by id', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    await request(app).post('/comments').send({
      comment: 'blah-blah',
      postId: '1',
    });

    const res = await request(app).delete('/comments/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      comment: expect.any(String),
      postId: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
