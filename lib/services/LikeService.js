const Like = require('../models/Like.js');

module.exports = class LikeService {
  static async addNewLike({ userEmail, postId }) {
    const userId = await Like.findByEmail(userEmail);

    const newLike = await Like.insert(userId.id, postId);
    return newLike;
  }
};
