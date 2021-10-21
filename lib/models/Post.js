const pool = require('../utils/pool');

module.exports = class Post {
  id;
  notifications;
  text;
  media;
  username;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.notifications = row.notifications;
    this.text = row.text;
    this.media = row.media_url;
    this.username = row.google_username;
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

  static async countLikes(id) {
    const { rows } = await pool.query(
      `SELECT COUNT(likes.id)
      FROM posts
      INNER JOIN likes
      ON posts.id = likes.post_id
      WHERE posts.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async getDetails(id) {
    const { rows } = await pool.query(
      `SELECT text, media_url, google_username
      FROM posts
      INNER JOIN users
      ON posts.user_id = users.id
      WHERE posts.id =$1`, [id]
    );
    const comments = await pool.query(
      `SELECT comment, google_username 
      FROM comments
      INNER JOIN posts
      ON comments.post_id = posts.id
      INNER JOIN users
      ON comments.user_id = users.id
      WHERE posts.id = $1`, [id]
    );
    const likes = await pool.query(
      `SELECT google_username
      FROM likes
      INNER JOIN users
      ON likes.user_id = users.id
      INNER JOIN posts
      ON likes.post_id = posts.id
      WHERE posts.id =$1`, [id]
    );

    const commentsArr = [];  
    let commentObj = {};
    comments.rows.map((row) => {
      commentObj = {
        username: row.google_username,
        comment: row.comment
      };
     
    });
    commentsArr.push(commentObj);

    const likesArr = [];
    let likeObj = {};
    likes.rows.map((row) => {
      likeObj = { 
        username: row.google_username,
      };
    });
    likesArr.push(likeObj);
  
    return {
      username: rows[0].google_username,
      text: rows[0].text,
      media: rows[0].media_url,
      comments: commentsArr,
      likes: likesArr
    };
  }
};
