const jwt = require('jsonwebtoken')

const signJWTPromise = (obj, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, secret, { algorithm: 'HS256' }, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token)
    })
  })
}

const verifyJWTPromise = (token, secret) => {
 return new Promise((resolve, reject) => {
   jwt.verify(token, secret, (err, decoded) => {
     if (err) {
       reject(err)
     }
     resolve(decoded)
   })
 })
}

module.exports = {
  signJWTPromise: signJWTPromise,
  verifyJWTPromise: verifyJWTPromise
}
