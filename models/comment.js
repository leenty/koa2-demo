const Comment = require('../db/models/index.js').comment

const getCommentByUserId = async (userId) => {
  // const comment = await Comment._findAll('user_id', userId, ['id', 'comment'])
  const comment = await Comment.findAll({
    where: {
      user_id: userId
    },
    attributes: ['id', 'comment', 'reply_id']
  })
  return comment
}

const createComment = async ({user_id, comment, post_target}) => {
  await Comment.create({
    user_id,
    comment,
    post_target
  })
  return true
}

const removeComment = async (id, user_id) => {
  const result = await Comment.destroy({
    where: {
      id,
      user_id
    }
  })
  return result ? '删除成功！' : '删除失败！'
}

const updateComment = async (id, user_id, comment) => {
  const result = await Comment.update(
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
