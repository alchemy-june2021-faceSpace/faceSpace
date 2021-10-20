const pool = require('../utils/pool.js');

module.exports = class Wish {
  id;
  userId;
  itemId;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.itemId = row.item_id;
  }

  static async findByEmail(userEmail) {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE google_email = $1;',
      [userEmail]
    );
    console.log('FIND BY EMAIL/WISH', rows[0]);
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
    console.log('AT WISH MODEL', rows[0]);
    return new Wish(rows[0]);
  }
};
