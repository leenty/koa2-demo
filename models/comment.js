const Comment = require('../db/models/index.js').comment
const User = require('../db/models/index.js').user
// Comment.belongsTo(User)

const userInfo = [{
  model: User,
  attributes: ['id', 'name', 'github', 'avatarUrl']
}]

const getCommentByPostTarget = async postTarget => {
  const comments = await Comment.findAll({
    include: userInfo,
    where: {
      postTarget
    },
    attributes: ['id', 'comment', 'replyId', 'postTarget', 'replyUserId', 'updatedAt']
  })
  return comments
}

const getCommentByUserId = async userId => {
  const comment = await Comment.findAll({
    // include: userInfo,
    where: {
      userId
    },
    attributes: ['id', 'comment', 'replyId', 'postTarget']
  })
  return comment
}

const createComment = async ({userId, comment, replyId, postTarget}) => {
  await Comment.create({
    userId,
    comment,
    replyId,
    postTarget
  })
  return true
}

const removeComment = async (id, userId) => {
  const result = await Comment.destroy({
    where: {
      id,
      userId
    }
  })
  return result ? '删除成功！' : '删除失败！'
}

const updateComment = async (id, userId, comment) => {
  const result = await Comment.update(
    {
      comment
    },
    {
      where: {
        id,
        userId
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
