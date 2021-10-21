const Purchase = require('../models/Purchase.js');


module.exports = class PurchaseService {

  static async create({ userEmail, itemId, cost }) {
    const userId = await Purchase.findByEmail(userEmail);
    const purchase = await Purchase.insert(userId.id, itemId, cost);
    return purchase;
  }
  
  
};
