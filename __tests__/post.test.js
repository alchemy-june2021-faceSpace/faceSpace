const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

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
  username: 'test-user',
  avatar: 'image.png',
};

const testPost = {
  username: standardUser.username,
  notifications: false,
  text: 'text-here',
  media: 'media.gif',
};

describe('faceSpace /posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  }, 10000);

  it('it should create a new post', async () => {
    const user = await User.insert(standardUser);

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

  it('should GET a post by id', async () => {
    const user = await User.insert(standardUser);

    const post = await Post.insert(testPost);

    const res = await request(app).get('/posts/1');

    expect(res.body).toEqual({
      id: '1',
      username: user.username,
      notifications: false,
      text: 'text-here',
      media: 'media.gif',
    });
  });

  it('should GET all posts', async () => {
    const user = await User.insert(standardUser);

    const post = await Post.insert(testPost);

    const res = await request(app).get('/posts');

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          username: expect.any(String),
          notifications: expect.anything(),
          text: expect.any(String),
          media: expect.any(String),
        },
      ])
    );
  });

  it('should PATCH a post by id', async () => {
    const user = await User.insert(standardUser);

    const post = await Post.insert(testPost);

    const res = await (
      await request(app).patch('/posts/1')
    ).send({
      notifications: true,
      text: 'text here',
      media: 'media.png',
    });

    expect(res.body).toEqual({
      id: '1',
      username: user.username,
      notifications: true,
      text: 'text here',
      media: 'media.png',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
