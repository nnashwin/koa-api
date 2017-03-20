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
    let bodyObj = ctx.request.body 

    if (typeof bodyObj.username !== 'string' || typeof bodyObj.password !== 'string' || typeof bodyObj.jobIds !== 'object') {
      return ctx.response.status = 400
    }

    let hash = await convertToHashPromise(bodyObj.password)

    var record = new User({
      username: bodyObj.username,
      password: hash,
      jobIds: bodyObj 
    })

    await record.save();
    ctx.response.status = 200
    return ctx.body = "User Saved"
}


const findAllUsers = async function (ctx) {
  let users = await User.all()
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
  (ctx) => {
    ctx.response.status = 200
  }
)

router.get('/find',
   setResTimeHeader,
   findAllUsers
)

exports.router = router
