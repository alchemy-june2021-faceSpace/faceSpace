const {
  // seedUsersTable,
  // seedPostsTable,
  // seedCommentsTable,
  // seedLikesTable,
  // seedListingsTable,
  // seedWishlistTable,
  seedPurchasesTable,
  // seedCategoriesTable,
} = require('./seedDb.js');

const seedTheTables = async () => {
  // await seedUsersTable();

  // await seedPostsTable();

  // await seedCommentsTable();

  // await seedLikesTable();

  // await seedCategoriesTable();

  // await seedListingsTable();

  // await seedWishlistTable();

  await seedPurchasesTable();
};

seedTheTables();
