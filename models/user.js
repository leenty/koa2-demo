const db =  require('../config/db')
const userModel =  '../schema/user'

const User = db.import(userModel)

const modelFind = require('../middleWare/modelFind')(User)

const getUserById = function* (id) {
  const userInfo = yield modelFind.findOne('id', id)
  return userInfo
}

const getUserByName = function* (name) {
  const userInfo = yield modelFind.findOne('name', name)
  return userInfo
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName
}
