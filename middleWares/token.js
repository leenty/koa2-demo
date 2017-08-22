const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const config = require('../config')

// 具体expiresIn取值可查阅 https://github.com/zeit/ms
const setToken = (tokenObj, expiresIn = '1d') => jwt.sign(tokenObj, config.token_secret, {expiresIn})
const getToken = () => koaJwt({secret: config.token_secret, debug: true})

module.exports = {
  setToken,
  getToken,
}
