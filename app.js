const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const app = new Koa()

const router = require('./users').router

app
  .use(BodyParser())
  .use(router.routes())


app.listen(9001)
