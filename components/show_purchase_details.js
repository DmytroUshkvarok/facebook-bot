const bbyApiKey = process.env.bby_api_key
const bby = require('bestbuy')(bbyApiKey)
const Customer = require('./db/customer_schema')
const mainMenuButton = {
  'content_type': 'text',
  'title': 'To main menu',
  'payload': 'main_menu'
}
const backToPurchasesListButton = {
  'content_type': 'text',
  'title': 'Back to purchases',
  'payload': 'purchases'
}

module.exports = function (bot, message) {
  const msgId = message.sender.id
  const purchaseTime = message.payload.slice(message.payload.indexOf(' ') + 1)

  Customer.findOne({ messenger_id: `${msgId}` }, 'purchases').exec(function (err, customer) {
    if (err) return console.log(err)
    const currentPurchaseObject = customer.purchases.filter(function (obj) {
      return (~obj.date.toString().indexOf(purchaseTime))
    })[0]
    const skuOfProduct = currentPurchaseObject.product
    const customersPhone = currentPurchaseObject.phone
    const customersDeliveryLatitude = currentPurchaseObject.coordinates.latitude
    const customersDeliveryLongitude = currentPurchaseObject.coordinates.longitude
    const priceOfProduct = currentPurchaseObject.price
    const details = `${customersPhone} | Deliver: lat.${customersDeliveryLatitude}, long.${customersDeliveryLongitude}` +
      ` | ${priceOfProduct}$`

    bby.products(`search=${skuOfProduct}`, {
      format: 'json',
      show: 'name,image'
    }, function (err, data) {
      if (err) console.warn(err)
      const createProductDetailsAttachment = function (data) {
        const objectToCreate = {}
        objectToCreate.type = 'template'
        objectToCreate.payload = {}
        objectToCreate.payload.template_type = 'generic'
        objectToCreate.payload.elements = []

        const productName = data.products[0].name
        const productImageURL = data.products[0].image

        objectToCreate.payload.elements[0] = {}
        objectToCreate.payload.elements[0].title = productName
        objectToCreate.payload.elements[0].subtitle = details
        objectToCreate.payload.elements[0].image_url = productImageURL
        objectToCreate.payload.elements[0].buttons = [
          {
            'type': 'postback',
            'title': 'Repeat',
            'payload': `view_more ${skuOfProduct}`
          }
        ]
        return objectToCreate
      }
      const productDetailsAttachment = createProductDetailsAttachment(data)

      return setTimeout(function () {
        bot.reply(message, {
          'attachment': productDetailsAttachment,
          'quick_replies': [mainMenuButton, backToPurchasesListButton]
        })
      }, 1000)
    })
  })
}
