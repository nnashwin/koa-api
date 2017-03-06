const Koa = require('koa')
const app = new Koa()

app.use(async function (ctx, next) => {

})

app.use(ctx => {
  ctx.body = "Is this the real life?"
})

app.listen(3000)
