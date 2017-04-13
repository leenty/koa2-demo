const Comment = require('../models/comments')

const getComment = function* () {
  const userId = this.params.user_id
  const result = yield Comment.getCommentByUserId(userId)
  this.body = result
}

const createComment = function* () {
  const data = this.request.body
  yield Comment.createComment(data)
  this.body = {
    success: true
  }
}

const removeComment = function* () {
  const {id, user_id} = this.params
  const msg = yield Comment.removeComment(id, user_id)

  this.body = {
    success: true,
    msg
  }
}

const updateComment = function* () {
  const {id, user_id} = this.params
  const comment = this.request.body.comment
  const msg = yield Comment.updateComment(id, user_id, comment)

  this.body = {
    success: true,
    msg
  }
}

module.exports = router => {
  router.get('/comment/:user_id', getComment)
  router.post('/comment', createComment)
  router.delete('/comment/:user_id/:id', removeComment)
  router.put('/comment/:user_id/:id', updateComment)
}
