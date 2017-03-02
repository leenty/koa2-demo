const db = require('../config/db')
const commentModel = '../schema/comment'

const Comment = require('../middleWare/modelFind')(db.import(commentModel))

const getCommentByUserId = function* (userId) {
  const comment = yield Comment.findAll('user_id', userId, ['id', 'comment'])
  return comment
}

const createComment = function* (data) {
  yield Comment.model.create({
    user_id: data.user_id,
    comment: data.comment
  })
  return true
}

module.exports = {
  getCommentByUserId,
  createComment
}
