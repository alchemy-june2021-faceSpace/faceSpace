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
      this.categoryId = row.category_id;
      this.category = row.category;
    }

    static async findByEmail(userEmail) {
      const { rows } = await pool.query(
        'SELECT id FROM users WHERE google_email = $1',
        [userEmail]
      );
      return rows[0];
    }

    static async insert({ userId, description, price, photo, categoryId }) {
      const { rows } = await pool.query(
        'INSERT INTO listings (user_id, description, price, photo, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId.id, description, price, photo, categoryId]
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

    static async update(id, userId, { description, price, photo, categoryId }) {
      const { rows } = await pool.query(
        `UPDATE listings
        SET description = $3, price = $4, photo = $5, category_id = $6
        WHERE id = $1
        AND user_id = $2
        RETURNING *`,
        [id, userId, description, price, photo, categoryId]
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

    static async getCategory(id){
      const { rows } = await pool.query(
        `SELECT listings.description, listings.price, listings.photo, categories.category
        FROM listings
        INNER JOIN categories
        ON listings.category_id = categories.id
        WHERE categories.id = $1`,
        [id]
      );
      return rows.map(row => {
        return new Listing(row);
      });
    }

    static async priceLowToHigh(){
      const { rows } = await pool.query(
        `SELECT listings.description, listings.price, listings.photo, categories.category
        FROM listings
        INNER JOIN categories
        ON listings.category_id = categories.id
        ORDER BY listings.price ASC
        LIMIT 25`,
      );
      return rows.map(row => {
        return new Listing(row);
      });
    }

    static async priceHighToLow(){
      const { rows } = await pool.query(
        `SELECT listings.description, listings.price, listings.photo, categories.category
        FROM listings
        INNER JOIN categories
        ON listings.category_id = categories.id
        ORDER BY listings.price DESC
        LIMIT 25`,
      );
      return rows.map(row => {
        return new Listing(row);
      });
    }
};
