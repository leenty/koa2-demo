var sequelize = require('sequelize')
const setModelMethods = function () {
  sequelize.prototype._findOne = function (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.findOne({
      where,
      attributes
    })
  }
  sequelize.prototype._findAll = function (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.findAll({
      where,
      attributes
    })
  }
}

module.exports = setModelMethods
