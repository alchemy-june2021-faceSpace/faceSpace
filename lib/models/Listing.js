const pool = require('../utils/pool');


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

    static async insert(userId, description, price, photo) {
 
      const { rows } = await pool.query(
        'INSERT INTO listings (user_id, description, price, photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId.id, description, price, photo]
      );
      return new Listing(rows[0]);
    }

    static async getById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM listings WHERE id = $1',
        [id]
      );
      return new Listing(rows[0]);
    }

    static async update(id, { description, price, photo }) {
      const { rows } = await pool.query(
        `UPDATE listings
        SET description = $3, price = $4, photo = $5
        WHERE id = $1
        AND user_id = $2
        RETURNING *`,
        [id, description, price, photo]
      );
      return new Listing(rows[0]);
    }

    static async remove(id, userId){
      const { rows } = await pool.query(
        'DELETE FROM listings WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
      );
      return new Listing(rows[0]);
    }
};
