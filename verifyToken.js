const jwt = require('jsonwebtoken');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibGVlbnR5IiwiaWQiOjEsImlhdCI6MTQ4ODM0ODc2Mn0.MWXvVgdOrlXJ0y89pbK-qsbw4DksLBAfdW7Z-nd54qk'
const data = jwt.verify(token, 'koa-test')

console.log(data);
