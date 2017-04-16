var config = {
  'development': {
    port: '8889',
    token_secret: 'koa-test'
  },
  'test': {
    port: '8889',
    token_secret: 'koa-test'
  },
  'production': {
    port: '80',
    token_secret: 'koa-test'
  }
}

module.exports = config[process.env.NODE_ENV]