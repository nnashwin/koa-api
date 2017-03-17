import test from 'ava'
import { createEmail } from '../email'

const defaultEmail = {
  text: "this is your reminder email",
  from: "fromUser <from_email@gmail.com>",
  to: "toUser <insert_email_here@gmail.com>",
  subject: "default reminder",
  sendEmail () {
    console.log(`
        ${text} sent to ${to} from ${from} with the subject ${subject}
    `)
  }
}

test('createEmail creates email with the correct types of default values', t => {
  let expectedEmail = defaultEmail 
  let actualEmail = createEmail()
  for (var key in expectedEmail) {
    t.is(typeof expectedEmail[key], typeof actualEmail[key])
  }
})
