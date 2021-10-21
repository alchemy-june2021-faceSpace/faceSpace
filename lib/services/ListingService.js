const Listing = require('../models/Listing');
const { findPhoneNumber } = require('../models/User');
const { sendSms } = require('../utils/twilio.js');


module.exports = class ListingService {
  static async create({ userEmail, description, price, photo, categoryId }){
    const userId = await Listing.findByEmail(userEmail);
    const listing = await Listing.insert({ userId, description, price, photo, categoryId });
    const phoneNumber = await findPhoneNumber(userEmail);
    if (!phoneNumber) return 'Please add phone number to profile';
    await sendSms(
      Number(phoneNumber),
      `Listing item created for ${description}`
    );
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
