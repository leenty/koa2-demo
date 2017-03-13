const router = require('koa-router')()
const jwt = require('koa-jwt')

const auth = require('./auth.js')
const comment = require('./comment.js')
const github

router.use('/auth', auth.routes())
router.use('/api', jwt({secret: 'koa-test'}), comment.routes())

module.exports = router
