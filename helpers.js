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

const setResTimeHeader = async (ctx, next) => {
  const start = new Date()
  await next()
  const sec = findTimeInSeconds(start)
  ctx.set('X-Response-Time', `${sec} seconds`)
  console.log(`${ctx.method} ${ctx.originalUrl} - ${sec}`)
  ctx.response.status = 200

  return ctx.response
}

module.exports = {
  findTimeInSeconds: findTimeInSeconds,
  convertToHashPromise: convertToHashPromise,
  setResTimeHeader: setResTimeHeader
}
