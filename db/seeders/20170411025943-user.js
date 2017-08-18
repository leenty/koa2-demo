'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      name: 'leenty',
      github_id: 13213680,
      email: 'leenty@qq.com',
      bio: 'vue2.0 demo  at http://vue2.leenty.com/',
      blog: 'www.leenty.com',
      password: '202cb962ac59075b964b07152d234b70',
      avatar_url: 'https://avatars3.githubusercontent.com/u/13213680?v=3',
      location: 'Hangzhou, Zhejiang, China'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
