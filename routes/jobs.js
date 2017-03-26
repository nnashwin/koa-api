import { findTimeInSeconds, convertToHashPromise, setResTimeHeader, rejectNonAppJsonReq, verifyJWT } from '../helpers'
import { signJWTPromise, verifyJWTPromise } from '../auth'
import secret from '../secret.js'

const Router = require('koa-router')
const Mongorito = require('mongorito')
const bodyParser = require('koa-bodyparser')
const Model = Mongorito.Model
const User = Model.extend({ collection: 'users' })

const jobs = new Router({
  prefix: '/jobs'
})

jobs.post('/find',
  setResTimeHeader,
  rejectNonAppJsonReq,
  verifyJWT
)

exports.jobs = jobs
