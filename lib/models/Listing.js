const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Listing {
    id;
    userId;
    description;
    price;
    photo;

    constructor(row) {
      this.id = row.id;
      this.userId = row.user_id;
      this.description = row.description;
      this.price = row.price;
      this.photo = row.photo;
    }

    static async findByEmail(userEmail) {
      const { rows } = await pool.query(
        'SELECT id FROM users WHERE google_email = $1',
        [userEmail]
      );
      return rows[0];
    }

    static async insert({ userId, description, price, photo }) {
 
      const { rows } = await pool.query(
        'INSERT INTO listings (user_id, description, price, photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId.id, description, price, photo]
      );
      return new Listing(rows[0]);
    }
};
