"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Learn NodeJS with Thomas",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Book Number Two with Thomas",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {});
  }
};
