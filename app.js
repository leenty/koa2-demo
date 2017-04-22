const config = require('./config')
const app = new (require('koa'))()
const json = require('koa-json')
const logger = require('koa-logger')
// const cors = require('kcors')
const cors = require('koa2-cors')
// const convert = require('koa-convert')
const uaParser = require('ua-parser-js')

const router = require('./routes.js')

require('./middleWares/modelFind')()

app.use(require('koa-bodyparser')())

app.use(async ({request, response, url}, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  const ua = uaParser(request.header['user-agent'])
  console.log('%s %s[%s] %s - %sms | browser: %s %s | engine: %s %s | OS: %s %s',
    request.header.host, request.method, response.status, url, ms,
    ua.browser.name, ua.browser.version,
    ua.engine.name, ua.engine.version,
    ua.os.name, ua.os.version)
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

// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE,HEAD')
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,emulateJSON,crossOrigin')
//   ctx.set('Access-Control-Allow-Credentials', true)
//   ctx.set('Access-Control-Max-Age', 86400)
//   await next()
// })

app.use(cors({
  origin: ({ request }) =>
                config.allowOrigin.includes('*') &&
                  '*' ||
                config.allowOrigin.includes(request.header.origin) &&
                  request.header.origin,
  allowMethods: config.allowMethods,
  allowHeaders: config.allowHeaders,
  maxAge:       config.maxAge,
  credentials:  config.credentials
}))

app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server create at http://localhost:${config.port}`)
})
module.exports = app
