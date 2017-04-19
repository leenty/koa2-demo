const config = require('./config')
const app = new (require('koa'))()
const json = require('koa-json')
const logger = require('koa-logger')
const cors = require('kcors')

const router = require('./routes.js')

require('./middleWares/modelFind')()

app.use(require('koa-bodyparser')())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %sms', ctx.method, ctx.url, ms)
})

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = {
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


app.use(router.routes())
app.use(cors())
// app.use(async (ctx) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://localhost:8090')
//   ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
//   ctx.set('Access-Control-Allow-Credentials', true)
// })


app.listen(config.port, () => {
  console.log(`server create at http://localhost:${config.port}`)
})
module.exports = app
