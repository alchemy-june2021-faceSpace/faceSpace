const pool = require('../utils/pool');


module.exports = class User {
    username;
    avatar;

    constructor(row) {
      this.username = row.google_username;
      this.avatar = row.google_avatar_url;
    }

    static async insert({ username, avatar }) {
      const { rows } = await pool.query(
        'INSERT INTO users (google_username, google_avatar_url) VALUES ($1, $2) RETURNING *',
        [username, avatar]
      );
      return new User(rows[0]);
    }
};
