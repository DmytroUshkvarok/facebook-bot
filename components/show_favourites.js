// const bbyApiKey = process.env.bby_api_key
// const bby = require('bestbuy')(bbyApiKey)
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

module.exports = function (bot, payloadMessage) {
  const message = payloadMessage

  const productsList = require('../products.json')

  const products = productsList
  const objectToCreate = {}

  objectToCreate.type = 'template'
  objectToCreate.payload = {}
  objectToCreate.payload.template_type = 'generic'
  objectToCreate.payload.elements = []

  for (let i = 0; i < 5; i++) {

    if (products[i]) {

      const productName = products[i].title
      const productImageURL = products[i].img

      objectToCreate.payload.elements[i] = {}
      objectToCreate.payload.elements[i].title = productName
      objectToCreate.payload.elements[i].image_url = productImageURL
      objectToCreate.payload.elements[i].subtitle = `Price: ${products[i].price} ZAR`
      // objectToCreate.payload.elements[i].buttons = [
      //   {
      //     'type': 'postback',
      //     'title': 'Add to basket',
      //     'payload': `add_to_favourites ${products[i].id}`
      //   },
      //   {
      //     'type': 'postback',
      //     'title': `Buy in one click for ${products[i].price} ZAR`,
      //     'payload': `buy_product ${products[i].id} ${products[i].price}`
      //   }
      // ]
    }
  }

  bot.reply(message, {
              'attachment': objectToCreate,
              'quick_replies': [{
                'content_type': 'text',
                'title': 'Buy all products',
                'payload': 'buy_all'
              }, mainMenuButton, shopButton]
            })
  
  // const msgId = message.sender.id

  // Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
  //   if (err) return console.log(err)
  //   if (!customer) {
  //     console.log(`No have customers with id ${msgId} in base.`)
  //     return bot.reply(message, {
  //       'text': `You have no customer's records in our base. To create a record add any product to favourites.`,
  //       'quick_replies': [mainMenuButton, shopButton]
  //     })
  //   } else {
  //     if (!customer.favourites) {
  //       return bot.reply(message, {
  //         'text': `You have no products added to favourites. Add first to see someone.`,
  //         'quick_replies': [mainMenuButton, shopButton]
  //       })
  //     } else {
  //       const arrayOfFavourites = customer.favourites
  //       const objectToCreate = {}
  //       objectToCreate.type = 'template'
  //       objectToCreate.payload = {}
  //       objectToCreate.payload.template_type = 'generic'
  //       objectToCreate.payload.elements = []

  //       arrayOfFavourites.forEach(function (favouriteSKU, i) {
  //         if (i < 10) {
  //           bby.products(`search=${favouriteSKU}`, {
  //             'format': 'json',
  //             'show': 'name,image,sku,salePrice'
  //           }, function (err, data) {
  //             if (err) console.warn(err)
  //             const productName = data.products[0].name
  //             const productImageURL = data.products[0].image

  //             objectToCreate.payload.elements[i] = {}
  //             objectToCreate.payload.elements[i].title = productName
  //             objectToCreate.payload.elements[i].image_url = productImageURL
  //             objectToCreate.payload.elements[i].buttons = [
  //               {
  //                 'type': 'postback',
  //                 'title': 'View more',
  //                 'payload': `view_more ${data.products[0].sku}`
  //               },
  //               {
  //                 'type': 'postback',
  //                 'title': `Buy for ${data.products[0].salePrice}$`,
  //                 'payload': `buy_product ${data.products[0].sku} ${data.products[0].salePrice}`
  //               }
  //             ]
  //           })
  //         }
  //       })
  //       return setTimeout(function () {
  //         bot.reply(message, {
  //           'attachment': objectToCreate,
  //           'quick_replies': [mainMenuButton, shopButton]
  //         })
  //       }, 1000)
  //     }
  //   }
  // })
}
