const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const router = require('./users').router

app
  .use(router.routes())


app.listen(9001)
