const Comment = require('../db/models/index.js').comment
// const User = require('../db/models/index.js').user
// Comment.belongsTo(User)

const getCommentByPostTarget = async post_target => {
  const comments = await Comment.findAll({
    // include: [ User ],
    where: {
      post_target
    },
    attributes: ['id', 'comment', 'reply_id', 'post_target', 'reply_userId', 'updatedAt']
  })
  return comments
}

const getCommentByUserId = async user_id => {
  const comment = await Comment.findAll({
    where: {
      user_id
    },
    attributes: ['id', 'comment', 'reply_id', 'post_target']
  })
  return comment
}

const createComment = async ({user_id, comment, reply_id, post_target}) => {
  await Comment.create({
    user_id,
    comment,
    reply_id,
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
  getCommentByPostTarget,
  getCommentByUserId,
  createComment,
  removeComment,
  updateComment
}
