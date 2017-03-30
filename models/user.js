const db = require('../config/db')
const userModel = '../schema/user'

const User = require('../middleWares/modelFind')(db.import(userModel))

const getUserById = function* (id) {
  const userInfo = yield User.findById(id, {
    attributes: ['id', 'name']
  })
  return userInfo
}

const getUserByName = function* (name) {
  const userInfo = yield User._findOne('name', name)
  return userInfo
}

const createUser = function* ({id, name, password}) {
  yield User.create({
    id,
    name,
    password
  })
  return true
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName
}
