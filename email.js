const email = require("emailjs")
const emailCred = require('./email-creds.json')

const server = email.server.connect({
  user: emailCred.user,
  password: emailCred.password,
  host: emailCred.host,
  ssl: emailCred.ssl
})

server.send({
  text: "test-email",
  from: "sunny <fake.email@gmail.com>",
  to: "rulai <fake.email.2@gmail.com",
  subject: "testing emailjs"
}, function (err, msg) {console.log(err || msg)})
