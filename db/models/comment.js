'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    user_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    reply_id: DataTypes.INTEGER,
    post_target: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return comment;
};