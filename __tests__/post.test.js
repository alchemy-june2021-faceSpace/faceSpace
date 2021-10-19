const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
// const seedDb = require('../lib/utils/seedDb.js');

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

const testPost = {
  userId: '1',
  notifications: false,
  text: 'text-here',
  media: 'media.gif',
};

describe('faceSpace /posts routes', () => {
  beforeAll(async () => {
    await setup(pool);
    // await seedDb();
  });

  it('it should POST a new post', async () => {
    await User.insert(standardUser);

    const res = await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      notifications: false,
      text: 'text-here',
      media: 'media.gif',
    });
  });

  it('should GET a post by id', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    const res = await request(app).get('/posts/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      notifications: false,
      text: 'text-here',
      media: 'media.gif',
    });
  });

  it('should GET all posts', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    const res = await request(app).get('/posts');

    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          userId: expect.any(String),
          notifications: expect.anything(),
          text: expect.any(String),
          media: expect.any(String),
        },
      ])
    );
  });

  it.only('should PATCH a post by id', async () => {
    await User.insert(standardUser);

    await request(app).post('/posts').send({
      text: 'text-here',
      media: 'media.gif',
      notifications: false,
    });

    const res = await request(app).patch('/posts/1').send({
      notifications: true,
      text: 'text here',
      media: 'media.png',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      notifications: true,
      text: 'text here',
      media: 'media.png',
    });
  });

  it('should DELETE a post by id', async () => {
    // const user = await User.insert(standardUser);

    await Post.insert(testPost);

    const res = await request(app).delete('/posts/21');

    expect(res.body).toEqual({
      id: '21',
      username: 'test-user',
      notifications: true,
      text: 'text here',
      media: 'media.png',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
