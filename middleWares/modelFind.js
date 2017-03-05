const setModelMethods = function (model) {
  model._findOne = function (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.findOne({
      where,
      attributes
    })
  }
  model._findAll = function (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.findAll({
      where,
      attributes
    })
  }

  return model
}

module.exports = setModelMethods
