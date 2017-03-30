const jwt = require('jsonwebtoken')
// const jwt = require('koa-jwt')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibGVlbnR5IiwiaWQiOjEsImlhdCI6MTQ4ODUxMTQ4Mn0.iKP3MXeXSVQX1cRppuYn4NtVFb2EacuBtNTZPt5l4FM'
const data = jwt.verify(token, 'koa-test')
console.log(data)
