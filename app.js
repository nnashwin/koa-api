const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const app = new Koa()

import { users } from './routes/users'
import { jobs } from './routes/jobs'

app
  .use(BodyParser())
  .use(users.routes())
  .use(jobs.routes())


app.listen(9001)
