const app = new (require('koa'))()
const koa = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const auth = require('./routes/auth.js')
const comment = require('./routes/comment.js')

app.use(require('koa-bodyparser')())

app.use(function* (next) {
  let start = new Date()
  yield next
  let ms = new Date() - start
  console.log('%s %s - %sms', this.method, this.url, ms)
})

app.use(function* (next) {
  try {
    yield next
  } catch (err) {
    if (401 == err.status) {
      this.status = 401
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', (err, ctx) => {
  console.log('server serror!', err)
})

koa.use('/auth', auth.routes())
koa.use('/api', jwt({secret: 'koa-test'}), comment.routes())

app.use(koa.routes())

app.listen(8889, () => {
  console.log('http://localhost:8889')
})

module.exports = app
