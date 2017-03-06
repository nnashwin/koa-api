const Koa = require('koa')
const app = new Koa()

const findTimeInSeconds = (startTime) => (new Date() - startTime) / 1000

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
