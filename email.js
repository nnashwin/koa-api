require('babel-register')
require('babel-polyfill')
const email = require("emailjs")
const emailCred = require('./email-creds.json')

const server = email.server.connect({
  user: emailCred.user,
  password: emailCred.password,
  host: emailCred.host,
  ssl: emailCred.ssl
})

const createEmail = (
  text = "this is your reminder email",
  from = "fromUser",
  to = "toUser",
  subject = "default reminder"
) => ({
  text,
  from,
  to,
  subject
})

const tylersEmail = createEmail()
console.log(tylersEmail)

// server.send({
//   text: "test-email",
//   from: "sunny <fake.email@gmail.com>",
//   to: "rulai <fake.email.2@gmail.com",
//   subject: "testing emailjs"
// }, function (err, msg) {console.log(err || msg)})


