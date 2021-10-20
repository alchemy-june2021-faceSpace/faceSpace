const Like = require('../models/Like.js');

module.exports = class LikeService {
  static async addNewLike({ userEmail, postId }) {
    const userId = await Like.findByEmail(userEmail);

    const newLike = await Like.insert(userId.id, postId);
    console.log('AT LIKE SERVICE', postId);
    return newLike;
  }

  static async deleteLike(id, userEmail) {
    const userId = await Like.findByEmail(userEmail);

    const deletedLike = await Like.deleteById({ id, userId: userId.id });
    return deletedLike;
  }
};
