import { verifyJWTPromise } from './auth'
import secret from './secret'

const bcrypt = require('bcrypt')
const findTimeInSeconds = (startTime) => (new Date() - startTime) / 1000
const convertToHashPromise = (plaintextPass, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintextPass, saltRounds, (err, hash) => {
      if (err) {
        return reject(err)
      }
      return resolve(hash)
    })
  })
}

const setResTimeHeader = async (ctx, next) => {
  const start = new Date()
  await next()
  const sec = findTimeInSeconds(start)
  ctx.set('X-Response-Time', `${sec} seconds`)
  console.log(`${ctx.method} ${ctx.originalUrl} - ${sec}`)
  if (ctx.response.status === 404) {
    ctx.response.status = 200
  }

  return ctx.response
}

const rejectNonAppJsonReq = async (ctx, next) => {
  if (ctx.is('application/json') === false)  {
    return ctx.response.status = 400
  }
  await next()
}

const buildRejReq = (...fields) => async (ctx, next) => {
  for (let field of fields) {
    if (ctx.request.body[field] === undefined) {
      return ctx.response.status = 400
    }
  }

  await next()
}

const verifyJWT = async (ctx, next) => {
  try {
    var jwt = await verifyJWTPromise(ctx.request.body.jwt, secret.secret)
  } catch (e) {
    ctx.response.status = 401
    ctx.response.errorMsg = e
  }
  await next()
}

module.exports = {
  findTimeInSeconds: findTimeInSeconds,
  convertToHashPromise: convertToHashPromise,
  setResTimeHeader: setResTimeHeader,
  rejectNonAppJsonReq,
  buildRejReq,
  verifyJWT
}
