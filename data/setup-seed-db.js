const {
  seedUsersTable,
  seedPostsTable,
  seedCommentsTable,
  seedLikesTable,
  seedListingsTable,
  seedWishlistTable,
  seedPurchasesTable,
  seedCategoriesTable,
} = require('./seedDb.js');

seedUsersTable();

seedPostsTable();

seedCommentsTable();

seedLikesTable();

seedListingsTable();

seedWishlistTable();

seedPurchasesTable();

seedCategoriesTable();
