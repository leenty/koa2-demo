const db = require('../config/db')
const userModel = '../schema/user'

const User = require('../middleWare/modelFind')(db.import(userModel))

const getUserById = function* (id) {
  const userInfo = yield User._findOne('id', id)
  return userInfo
}

const getUserByName = function* (name) {
  const userInfo = yield User._findOne('name', name)
  return userInfo
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName
}
