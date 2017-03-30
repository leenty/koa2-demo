const jwt = require('koa-jwt');
const user = require('../models/user')
const axios = require('axios')
const querystring = require('querystring')

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

const getGithubUserInfo = function* () {
  const code = this.query.code
  const loginAccess = yield axios.post('https://github.com/login/oauth/access_token', {
    client_id: 'c265a8dc9bd925256116',
    client_secret: '0535b4078b138a72f1142f950f671da2b5ab52da',
    code: code
  })
  // access_token=f20bbd86ce68c4028ba07b05c26da60dc0af9ce4&scope=&token_type=bearer
  const tokenObj = querystring.parse(loginAccess.data)
  console.log('tokenObj', tokenObj)

  const userInfo = yield axios.get('https://api.github.com/user', {
    access_token: tokenObj.access_token
  })
  this.body = {
    success: true,
    code: code,
    tokenObj,
    userInfo: userInfo.data
  }
}

module.exports = {
  auth (router) {
    router.get('/user/:id', getUserInfo)
    router.post('/user', postUserAuth)
    router.get('/github', getGithubUserInfo)
  }
}
