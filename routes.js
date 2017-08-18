const jwt = require('./middleWares/token.js')
// const jwt = require('koa-jwt')
const koaRouter = require('koa-router')
const router = new koaRouter()
// var config = require('./config')

const Users = require('./controllers/users.js')
const Comments = require('./controllers/comments.js')

//  (ctx, next) => {
//   console.log('middleware', ctx)
//   console.log('middlewaresa', jwt.getToken())
//   return next()
// },
router.use('/auth', group(route => {
  route.get('/user/:id', Users.getUserInfo)
  route.get('/user', jwt.getToken(), Users.getMyInfo)
  route.post('/user', Users.postUserLogin)
  route.get('/github', Users.getGithubUserInfo)
}))

router.use('/api', jwt.getToken(), group(route => {
  route.get('/comment/:user_id', Comments.getComment)
  route.post('/comment', Comments.createComment)
  route.delete('/comment/:user_id/:id', Comments.removeComment)
  route.put('/comment/:user_id/:id', Comments.updateComment)

}))

// router.use('/', group(route => {
//   route.get('/favicon.ico')
// }))
// 
function group(routes) {
  const group = new koaRouter()
  routes(group)
  return group.routes()
}

module.exports = router
