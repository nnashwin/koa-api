const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const Mongorito = require('mongorito')
const Model = Mongorito.Model

const User = Model.extend({
  collection: () => {
    return 'users'
  }
})

const findTimeInSeconds = (startTime) => (new Date() - startTime) / 1000

app.on('error', (err, ctx) =>
    log.error('server error', err, ctx)
)

app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = findTimeInSeconds(start)
  ctx.set('X-Response-Time', `${ms} seconds`)
})

app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = findTimeInSeconds(start)
  console.log(`${ctx.method} ${ctx.originalUrl} - ${ms}`)
})

app.use(ctx => {
  ctx.body = "Is this the real life?"
})

app.listen(3000)
