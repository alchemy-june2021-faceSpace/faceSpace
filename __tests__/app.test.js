const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
// const request = require('supertest');
// const app = require('../lib/app.js');

describe('faceSpace routes', () => {
  beforeEach(() => {
    return setup(pool);
  }, 10000);

  it('should evaluate 1+1', () => {
    const two = 1 + 1;
    expect(two).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
