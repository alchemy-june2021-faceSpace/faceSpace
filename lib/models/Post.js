const pool = require('../utils/pool');

module.exports = class Post {
  id;
  notifications;
  text;
  media;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.notifications = row.notifications;
    this.text = row.text;
    this.media = row.media_url;
    // this.comments = row.comments;
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT id FROM users WHERE google_email = $1;',
      [email]
    );
    return rows[0];
  }

  static async insert(userId, notifications, text, media) {
    const { rows } = await pool.query(
      `INSERT INTO posts
        (user_id,
        notifications,
        text,
        media_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [userId, notifications, text, media]
    );
    return new Post(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM posts
      WHERE id = ($1)`,
      [id]
    );
    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT *
      FROM posts`
    );
    return rows.map((row) => {
      return new Post(row);
    });
  }

  static async updateById({ id, notifications, text, media }) {
    const { rows } = await pool.query(
      `UPDATE posts
      SET notifications = $1, text = $2, media_url = $3
      WHERE id = $4
      RETURNING *`,
      [notifications, text, media, id]
    );
    return new Post(rows[0]);
    // update so only user can update their own post
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM posts
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Post(rows[0]);
  }
};
