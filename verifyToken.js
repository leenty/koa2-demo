const jwt = require('jsonwebtoken')
// const jwt = require('koa-jwt')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibGVlbnR5IiwiaWQiOjEsImlhdCI6MTQ5MzEwMDEwMX0.xiiX9QLUqaZW2yBObVxFFhbRDQx8vMXQNVChuva0sGk'
const data = jwt.verify(token, 'koa-test')
console.log(data)
