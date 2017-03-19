const bcrypt = require('bcrypt')

const findTimeInSeconds = (startTime) => (new Date() - startTime) / 1000

const convertToHashPromise = (plaintextPass, saltRounds) => {
    bcrypt.hash(plaintextPass, saltRounds, (err, hash) => {
      return Promise.resolve(hash)
      return Promise.reject(error)
    })
}

module.exports = {
  findTimeInSeconds: findTimeInSeconds,
  convertToHashPromise: convertToHashPromise
}
