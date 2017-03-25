import { findTimeInSeconds, convertToHashPromise, setResTimeHeader } from './helpers'
import { signJWTPromise, verifyJWTPromise } from './auth'
import secret from './secret.js'
const Router = require('koa-router')
const Mongorito = require('mongorito')
const bodyParser = require('koa-bodyparser')

const Model = Mongorito.Model

const User = Model.extend({ collection: 'users' })

const router = new Router({
  prefix: '/users'
})

const rejectNonAppJsonReq = async (ctx, next) => {
  if (ctx.is('application/json') === false)  {
    return ctx.response.status = 400
  }
  await next()
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

    ctx.jwt = {}
    ctx.jwt.username = bodyObj.username
    ctx.jwt.pass = bodyObj.password
    await next()
}

const createJWT = async function (ctx) {
  try {
    var jwt = await signJWTPromise(ctx.jwt, secret.secret)
  } catch (e) {
    console.log(e)
  }
  ctx.response.body = {
    "jwt": jwt
  }
}

Mongorito.connect('localhost/jobsUsers')

router.post('/create', 
  setResTimeHeader,
  rejectNonAppJsonReq,
  saveNewUser,
  createJWT
)

router.get('/login',
  setResTimeHeader,
  (ctx, next) => {
    // compare entered password to recorded password
    // return token and code 200 if correct
    return ctx.status = 200
  }
)
exports.router = router
