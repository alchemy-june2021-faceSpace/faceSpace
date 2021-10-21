const pool = require('../utils/pool');

module.exports = class Purchase {
    id;
    userId;
    itemId;
    cost;

    constructor(row) {
      this.id = row.id;
      this.userId = row.user_id;
      this.itemId = row.item_id;
      this.cost = row.cost;
      this.username = row.google_username;
      this.description = row.description;
      this.photo = row.photo;
      this.category = row.category;
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

    static async insert(userId, itemId, cost) {
      const { rows } = await pool.query(
        `INSERT INTO purchases
            (user_id, item_id, cost)
            VALUES ($1, $2, $3)
            RETURNING *`, [userId, itemId, cost]
      );
      return new Purchase(rows[0]);
    }

    static async getMyPurchases(userEmail) {
      const { rows } = await pool.query(
        `SELECT users.google_username, listings.description, listings.photo, purchases.cost, categories.category
        FROM users
        INNER JOIN listings ON users.id = listings.user_id
        INNER JOIN categories ON listings.category_id = categories.id
        INNER JOIN purchases ON listings.id = purchases.item_id
        WHERE users.google_email = $1`,
        [userEmail]
      );
      if (!rows[0]) return 'You have no purchases';
      return rows.map(row => {
        return new Purchase(row);
      });
    }

    static async getById(id) {
      const { rows } = await pool.query(
        `SELECT * 
            FROM purchases
            WHERE id = $1`,
        [id]
      );
      return new Purchase(rows[0]);
    }

    static async remove(id) {
      const { rows } = await pool.query(
        `DELETE FROM purchases
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Purchase(rows[0]);
    }
};
