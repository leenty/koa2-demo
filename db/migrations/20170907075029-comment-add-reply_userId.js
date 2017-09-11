'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('comments', 'reply_userId', {
      type: Sequelize.INTEGER,
      references: {
          model: 'users',
          key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('comments', 'reply_userId')
  }
};
