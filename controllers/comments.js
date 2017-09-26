const Comment = require('../models/comment')

const getCommentByPostTarget = async ctx => {
  const {postTarget} = ctx.params
  const result = await Comment.getCommentByPostTarget(postTarget)
  
  ctx.body = result
}

const getComment = async (ctx) => {
  const userId = ctx.state.user.id
  console.log(userId, 'getComment', ctx)
  const result = await Comment.getCommentByUserId(userId)
  ctx.body = result
}

const createComment = async (ctx) => {
  const {comment, postTarget, replyId} = ctx.request.body
  const userId = ctx.state.user.id
  console.log('createComment', {userId, comment, postTarget, replyId})
  await Comment.createComment({userId, comment, postTarget, replyId})
  ctx.body = {
    success: true
  }
}

const updateComment = async (ctx) => {
  const userId = ctx.state.user.id
  const {comment, commentId} = ctx.request.body
  console.log('updateComment', userId, comment, commentId)
  const msg = await Comment.updateComment(commentId, userId, comment)
  ctx.body = {
    success: true,
    msg
  }
}

const removeComment = async (ctx) => {
  console.log(ctx);
  const commentId = ctx.request.body.commentId
  const userId = ctx.state.user.id
  const msg = await Comment.removeComment(commentId, userId)
  ctx.body = {
    success: true,
    msg
  }
}

module.exports = {
  getComment,
  createComment,
  removeComment,
  updateComment,
  getCommentByPostTarget
}
