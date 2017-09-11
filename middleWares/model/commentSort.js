/**
 * deepFind 查询二维数组内的值的位置
 * @param  {Array} array      二维数组
 * @return {Array} indexArray 返回数组，长度为一，说明在数组第一层找到，并返回index。
 *                            长度为二，说明在数据第二层找到，并返回第一层和第二层的index
 */
const deepFind = function (array, findData) {
  let indexArray = []
  if (array.includes(findData)) {
    indexArray.push(array.indexOf(findData), 0)
    return indexArray
  }
  array.some((items, i) => {
    if (items.constructor === Array && items.includes(findData)) {
      indexArray.push(i, items.indexOf(findData))
      return true
    }
  })
  return indexArray
}

const sort = function (comments) {
  let sortedReplyId = []
  let sortedComments = []
  comments.forEach(comment => {
    if (comment.reply_id) {
      let indexArray = deepFind(comment)
      if (indexArray.length === 1) {
        sortedReplyId.push([comment.reply_id])
        sortedComments.push([comment])
      }
    } else {
      sortedReplyId.push([comment.reply_id])
      sortedComments.push([comment])
    }
  })
}

module.exports = sort