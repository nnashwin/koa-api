require('babel-register')
require('babel-polyfill')
const bcrypt = require('bcrypt')

import { findTimeInSeconds } from '../helpers.js'
import { convertToHashPromise,  convertToPass } from '../helpers.js'
import test from 'ava'

test('findTimeInSeconds returns a number', t => {
  let start = new Date()
  let time = findTimeInSeconds(start)

  t.is(typeof time, 'number')
})

test('convertToHash converts a plaintextPass to a bcrypt accurate hash', async t => {
  const saltRounds = 10
  const pass = "cookies"
  let actualHash = await convertToHashPromise(pass, saltRounds)
  bcrypt.compare(pass, actualHash, (err, res) => {
    console.log(res)
    if (res === false) {
      t.fail("the convertToHash function doesn't convert a password to accurate hash")
    }
  })
})
