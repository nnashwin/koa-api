const Router = require('koa-router')
const Mongorito = require('mongorito')
const bodyParser = require('koa-bodyparser')
import { findTimeInSeconds, convertToHashPromise, setResTimeHeader } from './helpers'
const Model = Mongorito.Model

const User = Model.extend({ collection: 'users'
})

const router = new Router({
  prefix: '/users'
})

const rejectNonAppJsonReq = (ctx, next) => {
  if (ctx.is('application/json') === false)  {
    return ctx.response.status = 400
  }
  next()
  return ctx.response.status = 200
}

const saveNewUser = async function (ctx, next) {
    let bodyObj = ctx.request.body 

    if (typeof bodyObj.username !== 'string' || typeof bodyObj.password !== 'string' || typeof bodyObj.jobIds !== 'object') {
      return ctx.response.status = 400
    }

    try {
      var hash = await convertToHashPromise(bodyObj.password)
    } catch (e) {
      console.log(e)
    }
    

    var record = new User({
      username: bodyObj.username,
      password: hash,
      jobIds: bodyObj.jobIds 
    })

    try {
      await record.save();
    } catch (e) {
      console.log(e)
    }
}

const findAllUsers = async function (ctx) {
  let users = await User.all()
  return users
}

const setBaseBody = (ctx, next) => {
  ctx.body = "This is a default, change when you start to implement the front-end"
  return next()
}

Mongorito.connect('localhost/jobsUsers')

router.get('/create',
   rejectNonAppJsonReq,
   setResTimeHeader,
   function (ctx, next) {
     return next()
   },
   saveNewUser
)

router.post('/create', 
  setResTimeHeader,
  rejectNonAppJsonReq,
  saveNewUser
)

router.get('/find',
   setResTimeHeader,
   findAllUsers
)

exports.router = router
