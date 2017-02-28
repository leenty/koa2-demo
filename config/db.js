const sequelize = require('sequelize')

const db = new sequelize('mysql://root:root@localhost/koa', {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

module.exports = db // 将Todolist暴露出接口方便Model调用
