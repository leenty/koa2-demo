const User = require('../db/models/index.js').user

const getUserById = async (id) => {
  const userInfo = await User.findById(id, {
    attributes: ['id', 'name', 'email', 'bio', 'blog', 'company', 'github', 'avatar', 'location', 'mobile']
  })
  return userInfo
}

const getUserByName = async (name) => {
  const userInfo = await User._findOne('name', name)
  return userInfo
}

const createUser = async ({name, password, email, bio, blog, company, github, avatar, location, mobile}) => {
  return await User.findOrCreate({
    where: {
      email
    },
    defaults: {
      name,
      password,
      email,
      bio,
      blog,
      company,
      github,
      avatar,
      location,
      mobile
    }
  })
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createUser
}
