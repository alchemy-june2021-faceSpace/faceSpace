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
