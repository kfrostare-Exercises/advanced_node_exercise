'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books',
      'AuthorId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors',
          key: 'id'
        }
      }
   )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Books',
      'AuthorId'
    )
  }
};
