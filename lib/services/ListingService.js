const Listing = require('../models/Listing');


module.exports = class ListingService {
  static async create({ userEmail, description, price, photo, categoryId }){
    const userId = await Listing.findByEmail(userEmail);
    const listing = await Listing.insert({ userId, description, price, photo, categoryId });
    return listing;
  }

  static async updateListing(id, userEmail, { description, price, photo, categoryId }){
    const userId = await Listing.findByEmail(userEmail);
    const putListing = await Listing.update(id, userId.id, { description, price, photo, categoryId });
    return putListing;
  }

  static async removeListing(id, userEmail){
    const userId = await Listing.findByEmail(userEmail);
    const deleteListing = await Listing.remove(id, userId.id);
    return deleteListing;
  }
};
