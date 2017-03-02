const jwt = require('koa-jwt');
const user = require('../models/user')

const getUserInfo = function* () {
  const id = this.params.id
  const result = yield user.getUserById(id)
  this.body = result
}

const postUserAuth = function* () {
  const data = this.request.body
  const userInfo = yield user.getUserByName(data.name)

  if (userInfo) {
    if (userInfo.password != data.password) {
      this.body = {
        success: false,
        info: 'wrong password!'
      }
    } else {
      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      }
      console.log(userToken)
      const secret = 'koa-test'
      const token = jwt.sign(userToken, secret)
      this.body = {
        success: true,
        token: token
      }
    }
  } else {
    this.body = {
      success: false,
      info: 'sorry! User does not exist!'
    }
  }
}

module.exports = {
  auth (router) {
    router.get('/user/:id', getUserInfo)
    router.post('/user', postUserAuth)
  }
}
