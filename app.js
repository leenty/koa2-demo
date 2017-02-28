const app = new (require('koa'))()
const koa = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const auth = require('./routes/auth.js')

app.use(require('koa-bodyparser')())

app.use(function* (next) {
  let start = new Date()
  yield next
  let ms = new Date() - start
  console.log('%s %s - %sms', this.method, this.url, ms)
})

app.on('error', (err, ctx) => {
  console.log('server serror!', err)
})

koa.use('/auth', auth.routes())

app.use(koa.routes())

app.listen(8889, () => {
  console.log('http://localhost:8889')
})

module.exports = app
