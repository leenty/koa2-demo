const Comment = require('../models/comment')

const getComment = async function (ctx) {
  const userId = ctx.params.user_id
  const result = await Comment.getCommentByUserId(userId)
  ctx.body = result
}

const createComment = async function (ctx) {
  const data = ctx.request.body
  await Comment.createComment(data)
  ctx.body = {
    success: true
  }
}

const removeComment = async function (ctx) {
  const {id, user_id} = ctx.params
  const msg = await Comment.removeComment(id, user_id)

  ctx.body = {
    success: true,
    msg
  }
}

const updateComment = async function (ctx) {
  const {id, user_id} = ctx.params
  const comment = ctx.request.body.comment
  const msg = await Comment.updateComment(id, user_id, comment)

  ctx.body = {
    success: true,
    msg
  }
}

module.exports = {
  getComment,
  createComment,
  removeComment,
  updateComment
}

// module.exports = router => {
//   router.get('/comment/:user_id', getComment)
//   router.post('/comment', createComment)
//   router.delete('/comment/:user_id/:id', removeComment)
//   router.put('/comment/:user_id/:id', updateComment)
// }
