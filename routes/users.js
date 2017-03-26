import { findTimeInSeconds, convertToHashPromise, setResTimeHeader, rejectNonAppJsonReq, buildRejReq, verifyJWT } from '../helpers'
import { signJWTPromise, verifyJWTPromise } from '../auth'
import secret from '../secret.js'
const Router = require('koa-router')
const Mongorito = require('mongorito')
const bodyParser = require('koa-bodyparser')

const Model = Mongorito.Model

const User = Model.extend({ collection: 'users' })

const rejectImproperSignup = buildRejReq("username", "password")
const rejectImproperLogin = buildRejReq("username", "password")

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

const users = new Router({
  prefix: '/users'
})


users.post('/create', 
  setResTimeHeader,
  rejectNonAppJsonReq,
  rejectImproperSignup,
  saveNewUser,
  createJWT
)

users.get('/login',
  setResTimeHeader,
  (ctx, next) => {
    // compare entered password to recorded password
    // return token and code 200 if correct
    return ctx.status = 200
  }
)

exports.users = users
