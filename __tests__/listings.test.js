const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const User = require('../lib/models/User.js');
const app = require('../lib/app.js');
const request = require('supertest');

jest.mock('../lib/middleware/ensureAuth.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'test-user1',
      email: 'test1-email@email.com',
      avatar: 'image.png',
    };
    next();
  };
});

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

const standardUser = {
  username: 'test-user1',
  email: 'test1-email@email.com',
  avatar: 'image.png',
};

describe('faceSpace routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('posts a new listing to table', async () => {
    await User.insert(standardUser);
    await request(app)
      .put('/user/1')
      .send({
        username: 'test-user-phone',
        avatar: 'image-2.png',
        phone: 3601234567
      });
      
    await request(app)
      .post('/categories')
      .send({ category: 'Food and Drink' });

    const res = await request(app)
      .post('/listings')
      .send({
        description: 'good item',
        price: 12.50,
        photo: 'image.png',
        categoryId: '1'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'good item',
      price: '$12.50',
      photo: 'image.png',
      categoryId: expect.any(String)
    });
  });

  it('gets a listing by its id', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'Food and Drink' });

    await request(app)
      .post('/listings')
      .send({
        description: 'testing a get route',
        price: 1.99,
        photo: 'www.fake-photo.com',
        categoryId: '1'
      });
    const res = await request(app)
      .get('/listings/1');
    
    expect(res.body).toEqual({
      id: '1',
      userId: expect.any(String),
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String),
      categoryId: expect.any(String)
    });
  });

  it('should update a listing by id', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'Food and Drink' });

    await request(app)
      .post('/listings')
      .send({
        description: 'GREAT BUY',
        price: 1.50,
        photo: 'image.png',
        categoryId: '1'
      });
    
    const res = await request(app)
      .put('/listings/1')
      .send({
        description: 'Great Item',
        price: 14.50,
        photo: 'www.image.png',
        categoryId: '1'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'Great Item',
      price: '$14.50',
      photo: 'www.image.png',
      categoryId: expect.any(String)
    });
  });

  it('deletes listing but it\'s id', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'Food and Drink' });

    await request(app)
      .post('/listings')
      .send({
        description: 'GREAT BUY',
        price: 1.50,
        photo: 'image.png',
        categoryId: '1'
      });
    const res = await request(app)
      .delete('/listings/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      description: 'GREAT BUY',
      price: '$1.50',
      photo: 'image.png',
      categoryId: expect.any(String)
    });
  });

  it('should return a list of items ordered by category', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'cars' });
    await request(app)
      .post('/categories')
      .send({ category: 'furniture' });

    await request(app)
      .post('/listings')
      .send({
        description: 'Toyota Corolla',
        price: 1500,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Nissan',
        price: 2100,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Couch',
        price: 100.50,
        photo: 'image.png',
        categoryId: '2'
      });

    const res = await request(app)
      .get('/listings/category/1');

    expect(res.body).toEqual(expect.arrayContaining([{
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String),
      category: expect.any(String)
    }]));
  });
  it('should organize items in listings priced low to high', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'cars' });
    await request(app)
      .post('/categories')
      .send({ category: 'furniture' });

    await request(app)
      .post('/listings')
      .send({
        description: 'Toyota Corolla',
        price: 1500,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Nissan',
        price: 2100,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Couch',
        price: 100.50,
        photo: 'image.png',
        categoryId: '2'
      });

    const res = await request(app)
      .get('/listings/price-low-to-high');

    expect(res.body).toEqual(expect.arrayContaining([{
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String),
      category: expect.any(String)
    }]));
  });
  it('should organize items in listings priced high to low', async () => {
    await User.insert(standardUser);

    await request(app)
      .post('/categories')
      .send({ category: 'cars' });
    await request(app)
      .post('/categories')
      .send({ category: 'furniture' });

    await request(app)
      .post('/listings')
      .send({
        description: 'Toyota Corolla',
        price: 1500,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Nissan',
        price: 2100,
        photo: 'image.png',
        categoryId: '1'
      });
    await request(app)
      .post('/listings')
      .send({
        description: 'Couch',
        price: 100.50,
        photo: 'image.png',
        categoryId: '2'
      });

    const res = await request(app)
      .get('/listings/price-high-to-low');

    expect(res.body).toEqual(expect.arrayContaining([{
      description: expect.any(String),
      price: expect.any(String),
      photo: expect.any(String),
      category: expect.any(String)
    }]));
  });

  afterAll(() => {
    pool.end();
  });
});
