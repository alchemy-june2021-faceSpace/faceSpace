const Post = require('../models/Post.js');

module.exports = class PostService {
  static async addNewPost({ userEmail, text, media, notifications }) {
    const userId = await Post.findByEmail(userEmail);
    // console.log('USERID ', userId.id);
    const newPost = await Post.insert(userId.id, notifications, text, media);
    return newPost;
  }
};
