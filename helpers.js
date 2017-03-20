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

module.exports = {
  findTimeInSeconds: findTimeInSeconds,
  convertToHashPromise: convertToHashPromise
}
