const jwt = require('./middleWares/token.js')
const koaRouter = require('koa-router')
const router = new koaRouter()

const Users = require('./controllers/users.js')
const Comments = require('./controllers/comments.js')

router.use('/auth', group(route => {
  route.get('/user/:id', Users.getUserInfo)
  route.post('/user', Users.postUserLogin)
  route.get('/github', Users.getGithubUserInfo)
}))

router.use('/api', jwt.getToken(), group(route => {
  route.get('/comment/:user_id', Comments.getComment)
  route.post('/comment', Comments.createComment)
  route.delete('/comment/:user_id/:id', Comments.removeComment)
  route.put('/comment/:user_id/:id', Comments.updateComment)

}))

function group(routes) {
  const group = new koaRouter()
  routes(group)
  return group.routes()
}

module.exports = router
