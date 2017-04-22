const config = require('./config.js')

module.exports = config[process.env.NODE_ENV]