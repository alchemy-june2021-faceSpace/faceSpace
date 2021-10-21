const Comment = require('../models/Comment.js');


module.exports = class CommentService {
  static async newComment({ comment, postId, userEmail }) {
    const userId = await Comment.findByEmail(userEmail);
    const newComment = await Comment.insert(userId.id, comment, postId);

    return newComment;
  }
};
