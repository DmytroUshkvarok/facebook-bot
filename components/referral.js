const Customer = require('./db/customer_schema')
const messengerLink = process.env.messenger_link

module.exports = function (bot, message) {
  const ref = message.referral.ref
  const msgId = message.sender.id
  if (ref !== msgId) {
    Customer.findOne({ messenger_id: `${ref}` }).exec(function (err, customer) {
      if (err) return console.log(err)
      if (!customer) {
        console.log(`No have customers with id ${ref} in base. Bad REF in link`)
      } else {
        if (!~customer.invitations.indexOf(msgId)) {
          customer.invitations.push(msgId)
          customer.save(function (err) {
            if (err) console.log(err)
            console.log(`Customers ${ref} invitations were successfully updated.`)
            bot.say(
              {
                text: `${messengerLink}?ref=${ref} is activated by user ${msgId}`,
                channel: `${ref}`
              }
            )
            if (customer.invitations !== 0 && customer.invitations.length % 3 === 0) {
              bot.say(
                {
                  text: `You have collected 3 activated invitations. Now you can get 1 free product in our store.`,
                  channel: `${ref}`
                })
            }
          })
        }
      }
    })
  }
}
