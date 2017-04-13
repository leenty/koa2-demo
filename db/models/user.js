'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT,
    blog: DataTypes.STRING,
    company: DataTypes.STRING,
    github: DataTypes.STRING,
    avatar: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};