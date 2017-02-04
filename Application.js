// Koa application is now a class and requires the new operator.
var Koa = require('koa');
var app = new Koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
