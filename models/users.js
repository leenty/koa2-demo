const User = require('../db/models/index.js').user

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

const createUser = function* ({name, password, email, bio, blog, company, github, avatar, location, mobile}) {
  yield User.create({
    name,
    password,
    email,
    bio,
    blog,
    company,
    github,
    avatar,
    location,
    mobile
  })
  return true
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createUser
}
