const pool = require('../utils/pool');

module.exports = class Comment {
  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.comment = row.comment;
    this.postId = row.post_id;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT id
      FROM users
      WHERE google_email = $1`,
      [email]
    );
    return rows[0];
  }

  static async insert(userId, comment, postId) {
    const { rows } = await pool.query(
      `INSERT INTO comments
        (user_id, comment, post_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [userId, comment, postId]
    );
    return new Comment(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM comments
      WHERE id = ($1)`,
      [id]
    );
    return new Comment(rows[0]);
  }
};
