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
  from = "Remindbot <from_email@gmail.com>",
  to = "toUser <insert_email_here@gmail.com>",
  subject = "default reminder"
) => ({
  text,
  from,
  to,
  subject,
  sendEmail () {
    server.send({
      text: text,
      from: from,
      to: to,
      subject: subject
    }, function (err, msg) { console.log(err || msg) })
  }
})

module.exports = {
  createEmail: createEmail
}
