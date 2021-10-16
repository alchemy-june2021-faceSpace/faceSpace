const pool = require('../utils/pool');

module.exports = class Post {
    id;
    notifications;
    text;
    media;

    constructor(row) {
      this.id = row.id;
      this.notifications = row.notifications;
      this.text = row.text;
      this.media = row.media_url;
    }

    static async insert({ username, notifications, text, media }) {
      const { rows } = await pool.query(
        'INSERT INTO posts (username, notifications, text, media_url) VALUES ($1, $2, $3, $4) RETURNING *', [username, notifications, text, media]
      );
      return new Post(rows[0]);
    }

};
