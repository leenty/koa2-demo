const User = require('../../db/models/index.js').user

const checkHimself = async (ctx, next, idName = 'user_id') => {
  if (!ctx.state) {
    ctx.body = {
      success: false,
      msg: '请先登录'
    }
  }

  // if (ctx.state.user.id === 1) {
  //   await next()
  //   return
  // }

  if (ctx.state.user.id === ctx.params[idName]) {
    await next()
    return
  }

  ctx.body = {
    success: false,
    msg: '您的权限不足'
  }
}

module.exports = checkHimself
