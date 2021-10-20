const Category = require('../models/Category.js');

module.exports = class CategoryService {
  static async create({ category }){
    const insertCategory = await Category.insert(category);
    return insertCategory;
  }
};
