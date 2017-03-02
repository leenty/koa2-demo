class _modelFind {
  constructor(model) {
    this.model = model
  }
  findOne (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.model.findOne({
      where,
      attributes
    })
  }
  findAll (field, fieldName, attributes = null) {
    let where = {}
    where[field] = fieldName
    return this.model.findAll({
      where,
      attributes
    })
  }
}

const setModel = function (model) {
  return new _modelFind(model)
}

module.exports = setModel
