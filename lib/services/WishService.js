const Wish = require('../models/Wish.js');

module.exports = class WishService {

  static async create({ userEmail, itemId }) {
    
    const userId = await Wish.findByEmail(userEmail);
    const newWish = await Wish.insert(userId.id, itemId);
    // console.log('AT WISH SERVICE', newWish);
    return newWish;
  }
  
  static async removeWish(id, userEmail) {
    const userId = await Wish.findByEmail(userEmail);
    console.log('AT WISH SERVICE', userEmail);
    const deleteWish = await Wish.remove({ id, userId: userId.id });
    return deleteWish;
  }
};
