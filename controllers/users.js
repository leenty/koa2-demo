const jwt = require('../middleWares/token.js')
const user = require('../models/user')
const axios = require('axios')
const querystring = require('querystring')

const getUserInfo = async (ctx) => {
  const id = ctx.params.id
  const result = await user.getUserById(id)
  ctx.body = result
}

const postUserLogin = async (ctx) => {
  const data = ctx.request.body
  const userInfo = await user.getUserByName(data.name)

  if (userInfo) {
    if (userInfo.password != data.password) {
      ctx.body = {
        success: false,
        info: 'wrong password!'
      }
    } else {
      const token = jwt.setToken({
        name: userInfo.name,
        id: userInfo.id
      })
      ctx.body = {
        success: true,
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: 'sorry! User does not exist!'
    }
  }
}

async function githubUserInfo(code) {
  const loginAccess = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: 'c265a8dc9bd925256116',
    client_secret: '0535b4078b138a72f1142f950f671da2b5ab52da',
    code: code
  })
  // access_token=f20bbd86ce68c4028ba07b05c26da60dc0af9ce4&scope=&token_type=bearer
  const tokenObj = querystring.parse(loginAccess.data)
  // console.log('\ntokenObj', tokenObj)

  return await axios.create({
    headers: {'Authorization': `token ${tokenObj.access_token}`}
  })
    .get('https://api.github.com/user')
    .then(githubUser => {
      // console.log('githubUser: ', githubUser.data)
      return {
        success: true,
        status: githubUser.status,
        data: githubUser.data
      }
    }).catch(err => {
      console.error('userError: ', err)
      return {
        success: false,
        status: err.response.status,
        message: err.response.data.message
      }
    })
}

const getGithubUserInfo = async (ctx) => {
  const code = ctx.query.code
  const redirect = ctx.query.redirect
  console.log('redirect >>> ', redirect)
  const userInfoResult = await githubUserInfo(code)
  if (userInfoResult.success) {
    const userInfo = await user.createGithubUser(userInfoResult.data)
    ctx.body = userInfoResult
    const token = jwt.setToken({
      name: userInfo.name,
      id: userInfo.id
    })
    ctx.body = {
      success: true,
      token: token,
      data: userInfoResult.data
    }
  } else {
    ctx.body = userInfoResult
  }
}

module.exports = {
  getUserInfo,
  postUserLogin,
  getGithubUserInfo
}
