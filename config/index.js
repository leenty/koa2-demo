var config = {
  'development': {
    port: '8889'
  },
  'test': {
    port: '8889'
  },
  'production': {
    port: '80'
  }
}

module.exports = config[process.env.NODE_ENV]