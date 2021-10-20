const Wish = require('../models/Wish.js');

module.exports = class WishService {

  static async create({ userEmail, itemId }) {
    
    const userId = await Wish.findByEmail(userEmail);
    const newWish = await Wish.insert(userId.id, itemId);
    // console.log('AT WISH SERVICE', newWish);
    return newWish;
  }
};
