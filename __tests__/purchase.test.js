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

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

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

    await request(app).post('/categories').send({ category: 'Food and Drink' });

    await request(app).post('/listings').send({
      description: 'text-here',
      price: 15.5,
      photo: 'media.gif',
      categoryId: '1',
    });

    const res = await request(app).post('/purchases').send({
      itemId: '1',
      cost: 15.5,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      itemId: expect.any(String),
      cost: expect.any(String),
    });
  });

  it('gets a purchase by it\'s id', async () => {
    await User.insert(standardUser);

    await request(app).post('/categories').send({ category: 'Food and Drink' });

    await request(app).post('/listings').send({
      description: 'text-here',
      price: 15.5,
      photo: 'media.gif',
      categoryId: '1',
    });

    await request(app).post('/purchases').send({
      itemId: '1',
      cost: 15.5,
    });

    const res = await request(app).get('/purchases/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      itemId: expect.any(String),
      cost: expect.any(String),
    });
  });

  it('should remove purchase by it\'s id and return the deleted purchase', async () => {
    await User.insert(standardUser);

    await request(app).post('/categories').send({ category: 'Food and Drink' });

    await request(app).post('/listings').send({
      description: 'text-here',
      price: 15.5,
      photo: 'media.gif',
      categoryId: '1',
    });

    await request(app).post('/purchases').send({
      itemId: '1',
      cost: 15.5,
    });

    const res = await request(app).delete('/purchases/1');

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
