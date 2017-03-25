const jwt = require('jsonwebtoken')
import { signJWTPromise, verifyJWTPromise } from '../auth.js'
import test from 'ava'

const secret = 'cookies'

test('test that signJWTPromise returns a JWT token', async t => {
  try {
    var actualToken = await signJWTPromise({exp: Math.floor(Date.now() / 1000) + (5 * 60), data: 'milk'}, secret)
  } catch (e) {
    console.log(e)
    return t.fail(e)
  }
  let decoded = jwt.verify(actualToken, secret)
  if (decoded.data !== 'milk') {
    t.fail("the jwt wasn't copied correctly: signJWTPromise")
  }
})

test('test that verifyJWTPromise returns the value from a JWT token', async t => {
  let token = jwt.sign({ milk: 'cookies' }, secret)
  try {
    var returnedObjFromToken = await verifyJWTPromise(token, secret)
  } catch (e) {
    console.log(e)
    return t.fail(e)
  }

  if (returnedObjFromToken.milk !== 'cookies') {
    t.fail("the jwt wasn't verified correctly: verifyJWTPromise'")
  }
})

test('test that verifyJWTPromise throws an error if the secret is wrong', async t => { 
  let token = jwt.sign({ milk: 'cookies' }, secret)

  try {
    var returnedObjFromToken = await verifyJWTPromise(token, 'spoiledCookies')
  } catch (e) {
    return t.pass('the try catch is throwing an error for the incorrect password')
  }

  return t.fail('the incorrect password error from the jwt library wasnt thrown properly')

})
