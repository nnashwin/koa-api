const Router = require('koa-router')
const Mongorito = require('mongorito')
const bodyParser = require('koa-bodyparser')
import { findTimeInSeconds, convertToHashPromise } from './helpers'
const Model = Mongorito.Model

const User = Model.extend({
  collection: 'users'
})

const router = new Router({
  prefix: '/users'
})


const saveNewUser = async function (ctx) {
    console.log(ctx.request.body)
    const jobIds = []

    for (let i = 0; i < (Math.random() * 20); i++) {
      jobIds.push('jobId')
    }

    let hash = await convertToHashPromise('cookies')

    var record = new User({
      username: `user${Math.random() * 100000}`,
      password: 'secret',
      jobIds: jobIds 
    })
    await record.save();
    return ctx.body = "User Saved"
}


const findAllUsers = async function (ctx) {
  let users = await User.all()
  //ctx.body = 'Returned all users'
  return users
}

const setResTimeHeader = async (ctx, next) => {
  const start = new Date()
  await next()
  const sec = findTimeInSeconds(start)
  ctx.set('X-Response-Time', `${sec} seconds`)
  return console.log(`${ctx.method} ${ctx.originalUrl} - ${sec}`)
}

const setBaseBody = (ctx, next) => {
  ctx.body = "This is a default, change when you start to implement the front-end"
  return next()
}

Mongorito.connect('localhost/jobsUsers')

router.get('/create',
   setResTimeHeader,
   function (ctx, next) {
     return next()
   },
   saveNewUser
)

router.post('/create', 
  setResTimeHeader,
  saveNewUser,
  async function (ctx) {
    console.log(ctx.request.body)
    ctx.response.status = 200
  }
)

router.get('/find',
   setResTimeHeader,
   findAllUsers
)

exports.router = router
