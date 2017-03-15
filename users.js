const Router = require('koa-router')
const Mongorito = require('mongorito')
const co = require('co')

const Model = Mongorito.Model

const User = Model.extend({
  collection: 'users'
})

const router = new Router({
  prefix: '/users'
})

const saveNewUser = co.wrap(function *(ctx) {
    Mongorito.connect('localhost/jobsUsers')
    const jobIds = []

    for (let i = 0; i < (Math.random() * 20); i++) {
      jobIds.push('jobId')
    }

    var record = new User({
      username: `user${Math.random() * 100000}`,
      password: 'secret',
      jobIds: jobIds 
    })
    yield record.save()
    yield Mongorito.disconnect()
    return ctx.body = "User Saved"
})


const findAllUsers = co.wrap(function* (ctx) {
  yield Mongorito.connect('localhost/jobsUsers')
  let users = yield User.all()
  ctx.body = 'Returned all users'
  console.log(users)
  yield Mongorito.disconnect()
})

const findTimeInSeconds = (startTime) => (new Date() - startTime) / 1000

const setResTimeHeader = async (ctx, next) => {
  const start = new Date()
  await next()
  const sec = findTimeInSeconds(start)
  ctx.set('X-Response-Time', `${sec} seconds`)
  return console.log(`${ctx.method} ${ctx.originalUrl} - ${sec}`)
}

const setBaseBody = (ctx, next) => {
  ctx.body = "This is a default, change when you start to implement the front-end"
  return next()
}

router.get('/create',
   setResTimeHeader,
   function (ctx, next) {
     console.log('creating user')
     return next()
   },
   saveNewUser
)

router.get('/find',
   setResTimeHeader,
   findAllUsers
)

exports.router = router
