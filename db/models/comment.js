'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    replyId: DataTypes.INTEGER,
    replyUserId: DataTypes.INTEGER,
    postTarget: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        comment.belongsTo(models.user)
      }
    }
  });
  return comment;
};