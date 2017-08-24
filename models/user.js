const User = require('../db/models/index.js').user

const getUserById = async (id) => await User.findById(id, {
  attributes: ['id', 'name', 'email', 'bio', 'blog', 'company', 'github', 'avatar_url', 'location', 'mobile']
})

const getUserByName = async (name) => {
  // const userInfo = await User._findOne('name', name)
  const userInfo = await User.findOne({
    where: {
      name
    }
  })
  return userInfo
}

const createGithubUser = async ({id, name, login, password, email, bio, blog, company, github, avatar_url, location, mobile}) => {
  var result = await User.findOrCreate({
    where: {
      github_id: id
    },
    defaults: {
      github_id: id,
      name: name || login || '不愿留下姓名的滑稽',
      password,
      email,
      bio,
      blog,
      company,
      github,
      avatar_url,
      location,
      mobile
    }
  })
  console.log('User.findOrCreate >>> ', result);
  return result[0]
}

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createGithubUser
}
