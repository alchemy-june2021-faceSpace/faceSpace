const pool = require('../utils/pool.js');

module.exports = class Like {
  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.postId = row.post_id;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE google_email = $1;',
      [email]
    );
    return rows[0];
  }

  static async insert(userId, postId) {
    const { rows } = await pool.query(
      `
      INSERT INTO likes
        (user_id,
         post_id)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [userId, postId]
    );
    return new Like(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM likes WHERE id = $1', [
      id,
    ]);
    return new Like(rows[0]);
  }
};
