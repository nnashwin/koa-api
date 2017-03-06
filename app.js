const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = "Is this the real life?"
})

app.listen(3000)
