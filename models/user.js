const db =  require('../config/db')
const userModel =  '../schema/user'

const User = db.import(userModel)

const getUserById = function* (id) {
  const userInfo = yield User.findOne({
    where: {
      id: id
    }
  })
  return userInfo
}

module.exports = {
  getUserById // 导出getUserById的方法，将会在controller里调用
}
