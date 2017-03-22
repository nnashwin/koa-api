const jwt = require('jsonwebtoken')
import { signJWTPromise } from '../auth.js'
import test from 'ava'
console.log(signJWTPromise)

const secret = 'cookies'

test('test that signJWTPromise returns a JWT token', async t => {
  let actualToken = await signJWTPromise({exp: Math.floor(Date.now() / 1000) + (5 * 60), data: 'milk'}, secret)
  let decoded = jwt.verify(actualToken, secret)
  console.log(decoded)
})
