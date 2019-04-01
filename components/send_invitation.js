const Customer = require('./db/customer_schema')
const messengerLink = process.env.messenger_link
const mainMenuButton = {
  'content_type': 'text',
  'title': 'To main menu',
  'payload': 'main_menu'
}
const shopButton = {
  'content_type': 'text',
  'title': 'Go to shop',
  'payload': 'shop'
}

module.exports = function (bot, message) {
  const msgId = message.sender.id
  Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
    if (err) return console.log(err)
    if (!customer) {
      Customer.create({ messenger_id: `${msgId}`, invitations: [] })
      console.log(`New customer was successfully added to base.`)
      bot.reply(message, {
        'text': `Your link for friends ${messengerLink}?ref=${msgId}\nShare with 3 friends and get 10% discount`,
        // 'quick_replies': [mainMenuButton, shopButton]
        'quick_replies': [shopButton]
      })
    } else {
      if (!customer.invitations.length) {
        customer.invitations = []
        customer.save(function (err) {
          if (err) console.log(err)
          console.log(`Customers invitations were successfully created with [].`)
          bot.reply(message, {
            'text': `Your link for friends  ${messengerLink}?ref=${msgId}\nShare with 3 friends and get 10% discount`,
            // 'quick_replies': [mainMenuButton, shopButton]
            'quick_replies': [shopButton]
          })
        })
      } else {
        bot.reply(message, {
          'text': `Your link for friends  ${messengerLink}?ref=${msgId}\nShare with 3 friends and get 10% discount`,
          // 'quick_replies': [mainMenuButton, shopButton]
          'quick_replies': [shopButton]
        })
      }
    }
  })
}
