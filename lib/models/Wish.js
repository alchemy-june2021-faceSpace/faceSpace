const pool = require('../utils/pool.js');

module.exports = class Wish {
  id;
  userId;
  itemId;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.itemId = row.item_id;
    this.username = row.google_username;
    this.description = row.description;
    this.price = row.price;
    this.category = row.category;
  }

  static async findByEmail(userEmail) {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE google_email = $1;',
      [userEmail]
    );
    return rows[0];
  }

  static async insert(userId, itemId) {
    const { rows } = await pool.query(
      `
        INSERT INTO wishlist
          (user_id,
          item_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [userId, itemId]
    );
    return new Wish(rows[0]);
  }
  
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM wishlist WHERE id = $1', 
      [id]
    );
    return new Wish(rows[0]);
  }
  
  static async remove({ id, userId }) {
    const { rows } = await pool.query(
      'DELETE FROM wishlist WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return new Wish(rows[0]);
  }

  static async getMyWishlist(userEmail) {
    const { rows } = await pool.query(
      `SELECT users.google_username, listings.description, listings.price, categories.category FROM users
      INNER JOIN wishlist ON users.id = wishlist.user_id
      INNER JOIN listings ON wishlist.item_id = listings.id
      INNER JOIN categories ON categories.id = listings.category_id
      WHERE users.google_email = $1`,
      [userEmail]
    );
    return rows.map(row => { 
      return new Wish(row);
    });
  }
};
