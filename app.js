import { users } from './routes/users';
import { jobs } from './routes/jobs';

const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const app = new Koa();
const PORT = 9001;


app
  .use(BodyParser())
  .use(users.routes())
  .use(jobs.routes());

console.log(`Koa App running on port: ${PORT}`)

app.listen(PORT);
