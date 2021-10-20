const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
    username;
    avatar;

    constructor(row) {
      this.username = row.google_username;
      this.email = row.google_email;
      this.avatar = row.google_avatar_url;
    }

    static async insert({ username, email, avatar }) {
      const { rows } = await pool.query(
        'INSERT INTO users (google_username, google_email, google_avatar_url) VALUES ($1, $2, $3) RETURNING *',
        [username, email, avatar]
      );
      return new User(rows[0]);
    }

    static async findByEmail(email) {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE google_email = $1',
        [email]
      );
      if(!rows[0]) return null;
      return new User(rows[0]);
    }

    static async remove(id) {
      const { rows } = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id]
      );
      return new User(rows[0]);
    }

    authToken() {
      return jwt.sign(this.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
    }

    toJSON(){
      return {
        id: this.id,
        username: this.username,
        email: this.email,
        avatar: this.avatar,
      };
    }
};
