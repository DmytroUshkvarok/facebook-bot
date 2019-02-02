const bbyApiKey = process.env.bby_api_key
const bby = require('bestbuy')(bbyApiKey)
const Customer = require('./db/customer_schema')
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

  Customer.findOne({ messenger_id: `${msgId}` }, 'purchases').exec(function (err, customer) {
    if (err) return console.log(err)
    if (!customer) {
      console.log(`No have customers with id ${msgId} in base.`)
      return bot.reply(message, {
        'text': `You have no customer's records in our base. To create a record please buy something.`,
        'quick_replies': [mainMenuButton, shopButton]
      })
    } else {
      if (customer.purchases.length === 0) {
        return bot.reply(message, {
          'text': `You have no purchases. Buy something to see someone.`,
          'quick_replies': [mainMenuButton, shopButton]
        })
      } else {
        const arrayOfProductsFromFinishedPurchases = []
        const arrayOfFinishedPurchasesDates = []
        customer.purchases.forEach(function (obj) {
          if (obj.coordinates.latitude) {
            arrayOfProductsFromFinishedPurchases.push(obj.product)
            arrayOfFinishedPurchasesDates.push(obj.date)
          }
        })
        if (!arrayOfFinishedPurchasesDates.length) {
          return bot.reply(message, {
            'text': `You have no finished purchases. Buy something to see someone.`,
            'quick_replies': [mainMenuButton, shopButton]
          })
        }
        const objectToCreate = {}
        objectToCreate.type = 'template'
        objectToCreate.payload = {}
        objectToCreate.payload.template_type = 'generic'
        objectToCreate.payload.elements = []

        arrayOfProductsFromFinishedPurchases.forEach(function (purchaseSKU, i) {
          if (i < 10) {
            bby.products(`search=${purchaseSKU}`, {
              'format': 'json',
              'show': 'name,sku'
            }, function (err, data) {
              if (err) console.warn(err)
              const productName = data.products[0].name
              const purchaseTime = arrayOfFinishedPurchasesDates[i].toString().slice(0, 24)

              objectToCreate.payload.elements[i] = {}
              objectToCreate.payload.elements[i].title = productName
              objectToCreate.payload.elements[i].subtitle = purchaseTime
              objectToCreate.payload.elements[i].buttons = [
                {
                  'type': 'postback',
                  'title': 'See details of deal',
                  'payload': `see_details_of_purchase ${purchaseTime}`
                }
              ]
            })
          }
        })
        return setTimeout(function () {
          bot.reply(message, {
            'attachment': objectToCreate,
            'quick_replies': [mainMenuButton, shopButton]
          })
        }, 1000)
      }
    }
  })
}
