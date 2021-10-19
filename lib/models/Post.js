const pool = require('../utils/pool');

module.exports = class Post {
  id;
  notifications;
  text;
  media;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.notifications = row.notifications;
    this.text = row.text;
    this.media = row.media_url;
  }

  static async insert({ username, notifications, text, media }) {
    const { rows } = await pool.query(
      `INSERT INTO posts
        (username,
        notifications,
        text,
        media_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [username, notifications, text, media]
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