import { findTimeInSeconds } from '../helpers.js'
import test from 'ava'

test('findTimeInSeconds returns a number', t => {
  let start = new Date()
  let time = findTimeInSeconds(start)

  t.is(typeof time, 'number')
})
