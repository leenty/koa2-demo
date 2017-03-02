const comment = require('../controllers/comment.js')
const router = require('koa-router')()

comment(router)

module.exports = router
