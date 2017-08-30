const Comment = require('../models/comment')

const getComment = async (ctx) => {
  const user_id = ctx.state.user.id
  console.log('getComment', ctx)
  const result = await Comment.getCommentByUserId(user_id)
  ctx.body = result
}

const createComment = async (ctx) => {
  const {comment, post_target} = ctx.request.body
  const user_id = ctx.state.user.id
  console.log('createComment', user_id, comment, post_target)
  await Comment.createComment(user_id, comment, post_target)
  ctx.body = {
    success: true
  }
}

const updateComment = async (ctx) => {
  const user_id = ctx.state.user.id
  const {comment, comment_id} = ctx.request.body
  console.log('updateComment', user_id, comment, comment_id)
  const msg = await Comment.updateComment(comment_id, user_id, comment)
  ctx.body = {
    success: true,
    msg
  }
}

const removeComment = async (ctx) => {
  console.log(ctx);
  const comment_id = ctx.request.body.comment_id
  const user_id = ctx.state.user.id
  const msg = await Comment.removeComment(comment_id, user_id)
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
