const jwt = require('jsonwebtoken')

const signJWTPromise = (obj, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, secret, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

module.exports = {
  signJWTPromise: signJWTPromise
}
