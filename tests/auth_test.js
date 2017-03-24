const jwt = require('jsonwebtoken')
import { signJWTPromise, verifyJWTPromise } from '../auth.js'
import test from 'ava'

const secret = 'cookies'

test('test that signJWTPromise returns a JWT token', async t => {
  try {
    var actualToken = await signJWTPromise({exp: Math.floor(Date.now() / 1000) + (5 * 60), data: 'milk'}, secret)
  } catch (e) {
    t.fail(e)
  }
  let decoded = jwt.verify(actualToken, secret)
  if (decoded.data !== 'milk') {
    t.fail("the jwt wasn't copied correctly")
  }
})

test('test that verifyJWTPromise returns the value from a JWT token', async t => {

})
