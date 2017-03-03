const db = require('../config/db')
const commentModel = '../schema/comment'

const Comment = require('../middleWare/modelFind')(db.import(commentModel))

const getCommentByUserId = function* (userId) {
  const comment = yield Comment._findAll('user_id', userId, ['id', 'comment'])
  return comment
}

const createComment = function* ({user_id, comment, post_id}) {
  console.log(user_id, comment, post_id);
  yield Comment.create({
    user_id,
    comment,
    post_id
  })
  return true
}

const removeComment = function* (id, user_id) {
  console.log(id, user_id);
  const result = yield Comment.destroy({
    where: {
      id,
      user_id
    }
  })
  console.log('delete',result);
  return result ? '删除成功！' : '删除失败！'
}

const updateComment = function* (id, user_id, comment) {
  const result = yield Comment.update(
    {
      comment
    },
    {
      where: {
        id,
        user_id
      }
    }
  )
  return result[0] ? '更新成功！' : '更新失败！'
}

module.exports = {
  getCommentByUserId,
  createComment,
  removeComment,
  updateComment
}
