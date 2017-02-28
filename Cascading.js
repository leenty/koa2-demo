var koa = require('koa');
var app = new koa();

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
  // this.cookies.set('name', 'tobi');
  // console.log(this.cookies.get('name'));
  // this.throw(403);
  // this.throw('something exploded');
  // this.throw(401, 'access_denied', { user: 'user' });
  console.log(this.request);
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %sms', this.method, this.url, ms);
});

// response

app.use(function *(){
  // this.body = 'Hello World';
  this.body = {
    test: 123,
    qwr: 'asd'
  };
});
app.listen(3002);
console.log('http://localhost:3002');
