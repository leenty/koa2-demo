const comment = require('../models/comment')

const getComment = function* () {
  const userId = this.params.user_id
  const result = yield comment.getCommentByUserId(userId)
  this.body = result
}

const createComment = function* () {
  const data = this.request.body
  yield comment.createComment(data)
  this.body = {
    success: true
  }
}

module.exports = router => {
  router.get('/comment/:user_id', getComment)
  router.post('/comment', createComment)
}
