const jwt = require('koa-jwt');
var config = require('../config')

const setToken = tokenObj => jwt.sign(tokenObj, config.token_secret)
const getToken = () => jwt({secret: config.token_secret})

module.exports = {
  setToken,
  getToken,
}