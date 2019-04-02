// const bbyApiKey = process.env.bby_api_key
// const bby = require('bestbuy')(bbyApiKey)
const mainMenu = {
  'text': 'MAIN MENU',
  'quick_replies': [
    // {
    //   'content_type': 'text',
    //   'title': 'My purchases',
    //   'payload': 'purchases'
    // },
    {
      'content_type': 'text',
      'title': 'My basket',
      'payload': 'favourites'
    },
    {
      'content_type': 'text',
      'title': 'Shop',
      'payload': 'shop'
    },
    {
      'content_type': 'text',
      'title': 'To invite a friend',
      'payload': 'send_invitation'
    }
  ]
}
const backToMainMenuButton = {
  'content_type': 'text',
  'title': 'To main menu',
  'payload': 'main_menu'
}
const showCatalogButton = {
  'content_type': 'text',
  'title': 'To catalog',
  'payload': 'back_to_catalog'
}

module.exports = function (controller) {
  controller.on('facebook_postback', function (bot, message) {
    if (message.payload === 'start_button_clicked') {
      // if (message.referral) {
      //   require('./referral.js')(bot, message)
      // }
      // showMainMenu(bot, message)
      bot.reply(message, 'Hi! I\'m here!\nDo you want to always have supply of food and save money on food purchases?\nNo problem. I will help you with this :)\nUse the static menu buttons below to get started and use the capabilities of the bot.')
    }
  })

  controller.on('facebook_referral', function (bot, message) {
    require('./referral.js')(bot, message)
    showMainMenu(bot, message)
  })

  controller.on('facebook_postback', function (bot, message) {
    if (message.payload === 'catalog') {
      // showingCatalog(bot, message)
      showingCatalog(bot, message, "BULK COMBOS")
    }
  })

  controller.on('facebook_postback, message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'main_menu') {
        showMainMenu(bot, message)
      }
      if (message.quick_reply.payload === 'shop') {
        // showingCatalog(bot, message)
        showingCatalog(bot, message, "BULK COMBOS")
      }
      if (message.quick_reply.payload === 'back_to_catalog') {
        // showingCatalog(bot, message)
        showingCatalog(bot, message, "BULK COMBOS")
      }
      if (~message.quick_reply.payload.indexOf('go_to_next_page')) {
        const number = +message.quick_reply.payload.split(' ')[1] + 1

        showingCatalog(bot, message, number)
      }
      if (~message.quick_reply.payload.indexOf('go_to_previous_page')) {
        const number = +message.quick_reply.payload.split(' ')[1] - 1

        showingCatalog(bot, message, number)
      }
    } else if (message.payload === 'main_menu') {
      showMainMenu(bot, message)
    // } else if (typeof (message.payload) === 'string' && ~message.payload.indexOf('view_more')) {
    //   const skuOfProduct = message.payload.split(' ')[1]

    //   bby.products(`search=${skuOfProduct}`, {
    //     format: 'json',
    //     show: 'name,image,longDescription,salePrice'
    //   }, function (err, data) {
    //     if (err) console.warn(err)
    //     const createProductDetailsAttachment = function (data) {
    //       const objectToCreate = {}
    //       objectToCreate.type = 'template'
    //       objectToCreate.payload = {}
    //       objectToCreate.payload.template_type = 'generic'
    //       objectToCreate.payload.elements = []

    //       const productName = data.products[0].name
    //       const productImageURL = data.products[0].image
    //       const longProductDescription = data.products[0].longDescription
    //       const productPrice = data.products[0].salePrice

    //       objectToCreate.payload.elements[0] = {}
    //       objectToCreate.payload.elements[0].title = productName
    //       objectToCreate.payload.elements[0].subtitle = longProductDescription
    //       objectToCreate.payload.elements[0].image_url = productImageURL
    //       objectToCreate.payload.elements[0].buttons = [
    //         {
    //           'type': 'postback',
    //           'title': 'Add to favourites',
    //           'payload': `add_to_favourites ${skuOfProduct}`
    //         },
    //         {
    //           'type': 'postback',
    //           'title': `Buy for ${productPrice}$`,
    //           'payload': `buy_product ${skuOfProduct} ${productPrice}`
    //         }
    //       ]
    //       return objectToCreate
    //     }
    //     const productDetailsAttachment = createProductDetailsAttachment(data)
    //     bot.reply(message, {
    //       'attachment': productDetailsAttachment,
    //       'quick_replies': [backToMainMenuButton, showCatalogButton]
    //     })
    //   })
    // } else if (typeof (message.payload) === 'string' && ~message.payload.indexOf('buy_product')) {
      const skuOfProduct = message.payload.split(' ')[1]
      // require('./write_purchases')(message)
      bot.reply(message, {
        'text': 'Please share your phone',
        'quick_replies': [
          {
            'content_type': 'user_phone_number'
          },
          // {
          //   'content_type': 'text',
          //   'title': 'Back to product',
          //   'payload': `back_to_product ${skuOfProduct}`
          // }
        ]
      })
    }
  })

  // controller.on('message_received', function (bot, message) {
  //   if (message.quick_reply) {
  //     if (~message.quick_reply.payload.indexOf('back_to_product')) {
  //       const skuOfProduct = message.quick_reply.payload.split(' ')[1]

  //       bby.products(`search=${skuOfProduct}`, {
  //         format: 'json',
  //         show: 'name,image,longDescription,salePrice'
  //       }, function (err, data) {
  //         if (err) console.warn(err)
  //         const createProductDetailsAttachment = function (data) {
  //           const objectToCreate = {}
  //           objectToCreate.type = 'template'
  //           objectToCreate.payload = {}
  //           objectToCreate.payload.template_type = 'generic'
  //           objectToCreate.payload.elements = []

  //           const productName = data.products[0].name
  //           const productImageURL = data.products[0].image
  //           const longProductDescription = data.products[0].longDescription
  //           const productPrice = data.products[0].salePrice

  //           objectToCreate.payload.elements[0] = {}
  //           objectToCreate.payload.elements[0].title = productName
  //           objectToCreate.payload.elements[0].subtitle = longProductDescription
  //           objectToCreate.payload.elements[0].image_url = productImageURL
  //           objectToCreate.payload.elements[0].buttons = [
  //             {
  //               'type': 'postback',
  //               'title': 'Add to favourites',
  //               'payload': `add_to_favourites ${skuOfProduct}`
  //             },
  //             {
  //               'type': 'postback',
  //               'title': `Buy for ${productPrice}$`,
  //               'payload': `buy_product ${skuOfProduct} ${productPrice}`
  //             }
  //           ]
  //           return objectToCreate
  //         }
  //         const productDetailsAttachment = createProductDetailsAttachment(data)

  //         bot.reply(message, {
  //           'attachment': productDetailsAttachment,
  //           'quick_replies': [backToMainMenuButton, showCatalogButton]
  //         })
  //       })
  //     }
  //   }
  // })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload.length === 13 && message.quick_reply.payload[0] === '+') {
        // require('./fix_phone.js')(message)
        bot.reply(message, {
          'text': 'Please share your location for delivery',
          // 'quick_replies': [{ 'content_type': 'location' }, backToMainMenuButton]
          'quick_replies': [{ 'content_type': 'location' }]
        })
      }
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'send_invitation') {
        require('./send_invitation.js')(bot, message)
      }
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'buy_all') {
        bot.reply(message, {
          'text': 'Please share your phone',
          'quick_replies': [
            {
              'content_type': 'user_phone_number'
            }
          ]
        })
      }
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'purchases') {
        require('./show_purchases_list.js')(bot, message)
      }
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'favourites') {
        require('./show_favourites.js')(bot, message)
      }
    }
  })

  controller.on('facebook_postback', function (bot, message) {
    if (typeof (message.payload) === 'string' && ~message.payload.indexOf('add_to_favourites')) {
      require('./write_favourites.js')(bot, message)
    }
  })

  controller.on('facebook_postback', function (bot, message) {
    if (typeof (message.payload) === 'string' && ~message.payload.indexOf('see_details_of_purchase')) {
      require('./show_purchase_details.js')(bot, message)
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.attachments && message.attachments[0].type === 'location') {
      // require('./fix_coordinates.js')(message)
      bot.reply(message, {
        'text': 'Congratulations! Our courier will contact you within 2 hours',
        // 'quick_replies': [backToMainMenuButton, showCatalogButton]
        'quick_replies': [showCatalogButton]
      })
      setTimeout(function () {
        require('./send_nps_request.js')(bot, message)
      }, 60000 * 60 * 48)
    }
  })

  controller.on('facebook_postback', function (bot, message) {
    if (typeof (message.payload) === 'string' && ~message.payload.indexOf('nps')) {
      require('./get_nps_answer.js')(message)
    }
  })

  function showMainMenu (bot, message) {
    bot.reply(message, mainMenu)
  }

  // function showingCatalog (bot, message, page) {
  //   const pageNumber = page || 1

  //   bby.products('search=digital camera canon', {
  //     'format': 'json',
  //     'show': 'name,image,sku,salePrice',
  //     'page': `${pageNumber}`
  //   }, function (err, data) {
  //     if (err) console.warn(err)
  //     const createProductsListAttachment = function (data) {
  //       let i
  //       const objectToCreate = {}

  //       objectToCreate.type = 'template'
  //       objectToCreate.payload = {}
  //       objectToCreate.payload.template_type = 'generic'
  //       objectToCreate.payload.elements = []

  //       for (i = 0; i < 10; i++) {
  //         if (data.products[i]) {
  //           const productName = data.products[i].name
  //           const productImageURL = data.products[i].image

  //           objectToCreate.payload.elements[i - k] = {}
  //           objectToCreate.payload.elements[i - k].title = productName
  //           objectToCreate.payload.elements[i - k].image_url = productImageURL
  //           objectToCreate.payload.elements[i - k].buttons = [
  //             {
  //               'type': 'postback',
  //               'title': 'View more',
  //               'payload': `view_more ${data.products[i].sku}`
  //             },
  //             {
  //               'type': 'postback',
  //               'title': 'Add to favourites',
  //               'payload': `add_to_favourites ${data.products[i].sku}`
  //             },
  //             {
  //               'type': 'postback',
  //               'title': `Buy for ${data.products[i].salePrice}$`,
  //               'payload': `buy_product ${data.products[i].sku} ${data.products[i].salePrice}`
  //             }
  //           ]
  //         }
  //       }

  //       return objectToCreate
  //     }

  //     const productsListAttachment = createProductsListAttachment(data)

  //     if (pageNumber === 1) {
  //       bot.reply(message, {
  //         'attachment': productsListAttachment,
  //         'quick_replies': [backToMainMenuButton,
  //           {
  //             'content_type': 'text',
  //             'title': 'See more products',
  //             'payload': `go_to_next_page ${pageNumber}`
  //           }]
  //       })
  //     } else {
  //       bot.reply(message, {
  //         'attachment': productsListAttachment,
  //         'quick_replies': [
  //           {
  //             'content_type': 'text',
  //             'title': 'See previous',
  //             'payload': `go_to_previous_page ${pageNumber}`
  //           },
  //           backToMainMenuButton,
  //           {
  //             'content_type': 'text',
  //             'title': 'See next',
  //             'payload': `go_to_next_page ${pageNumber}`
  //           }
  //         ]
  //       })
  //     }
  //   })
  // }



  controller.on('message_received', function (bot, message) {
    if (message.text === "Hi" ||
        message.text === "hi" || 
        message.text === "HI") {
      
      bot.reply(message, {
        'text': 'Hi! I\'m here!\nDo you want to always have supply of food and save money on food purchases?\nNo problem. I will help you with this :)\nUse the static menu buttons below to get started and use the capabilities of the bot.',
        // 'quick_replies': [backToMainMenuButton, showCatalogButton]
      })
    }
  })

  controller.on('facebook_postback', function (bot, message) {
    if (message.payload === 'show_basket') {
      require('./show_favourites.js')(bot, message)
    }
  })
  
  controller.on('facebook_postback', function (bot, message) {
    if (message.payload === 'send_invitation') {
      require('./send_invitation.js')(bot, message)
    }
  })

  controller.on('message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === `BULK COMBOS` ||
          message.quick_reply.payload === `DAIRY PRODUCTS` ||
          message.quick_reply.payload === `DRINKS` ||
          message.quick_reply.payload === `DRY GROCERIES` ||
          message.quick_reply.payload === `FRUIT & VEGETABLES` ||
          message.quick_reply.payload === `HOUSEHOLD & TOILETRIES` ||
          message.quick_reply.payload === `HOUSEHOLD CLEANING` ||
          message.quick_reply.payload === `MEAT & POULTRY`) {

            showingCatalog(bot, message, message.quick_reply.payload)
      }
    }
  })
  
  function showingCatalog (bot, message, category) {
    const productsList = require('../products.json')

    const createProductsListAttachment = function (data) {
      const products = data
      const objectToCreate = {}

      let currentCategoryProductsArray = []

      for (let i = 0; i < products.length; i++) {

        if (products[i].category === category) {

          currentCategoryProductsArray.push(products[i])
        }
      }

      objectToCreate.type = 'template'
      objectToCreate.payload = {}
      objectToCreate.payload.template_type = 'generic'
      objectToCreate.payload.elements = []

      for (let i = 0; i < currentCategoryProductsArray.length; i++) {

        if (currentCategoryProductsArray[i]) {

          const productName = currentCategoryProductsArray[i].title
          const productImageURL = currentCategoryProductsArray[i].img

          objectToCreate.payload.elements[i] = {}
          objectToCreate.payload.elements[i].title = `R ${currentCategoryProductsArray[i].price}`
          objectToCreate.payload.elements[i].subtitle = productName
          objectToCreate.payload.elements[i].image_url = productImageURL
          objectToCreate.payload.elements[i].buttons = [
            {
              'type': 'postback',
              'title': `Buy 1 for ${currentCategoryProductsArray[i].price} R`,
              'payload': `add_to_favourites ${currentCategoryProductsArray[i].title}`
            },
            {
              'type': 'postback',
              'title': `Buy 2 for ${currentCategoryProductsArray[i].price * 2} R`,
              'payload': `add_to_favourites ${currentCategoryProductsArray[i].title}`
            },
            {
              'type': 'postback',
              'title': `Buy 3 for ${currentCategoryProductsArray[i].price * 3} R`,
              'payload': `add_to_favourites ${currentCategoryProductsArray[i].title}`
            },
            // {
            //   'type': 'postback',
            //   'title': `Buy 4 for ${currentCategoryProductsArray[i].price * 4} R`,
            //   'payload': `add_to_favourites ${currentCategoryProductsArray[i].title}`
            // },
            // {
            //   'type': 'postback',
            //   'title': `Buy 5 for ${currentCategoryProductsArray[i].price * 5} R`,
            //   'payload': `add_to_favourites ${currentCategoryProductsArray[i].title}`
            // },
            // {
            //   'type': 'postback',
            //   'title': `Buy in one click for ${products[i].price} ZAR`,
            //   'payload': `buy_product ${products[i].id} ${products[i].price}`
            // }
          ]
        }
      }

      return objectToCreate
    }

    const productsListAttachment = createProductsListAttachment(productsList)

    // if (pageNumber === 1) {
      bot.reply(message, {
        'attachment': productsListAttachment,
        'quick_replies': [
          // backToMainMenuButton,
          // {
          //   'content_type': 'text',
          //   'title': 'See more products',
          //   'payload': `go_to_next_page ${pageNumber}`
          // }
          {
            'content_type': 'text',
            'title': 'BULK COMBOS',
            'payload': `BULK COMBOS`
          },
          {
            'content_type': 'text',
            'title': 'DAIRY PRODUCTS',
            'payload': `DAIRY PRODUCTS`
          },
          {
            'content_type': 'text',
            'title': 'DRINKS',
            'payload': `DRINKS`
          },
          {
            'content_type': 'text',
            'title': 'DRY GROCERIES',
            'payload': `DRY GROCERIES`
          },
          {
            'content_type': 'text',
            'title': 'FRUIT & VEGETABLES',
            'payload': `FRUIT & VEGETABLES`
          },
          {
            'content_type': 'text',
            'title': 'HOUSEHOLD & TOILETRIES',
            'payload': `HOUSEHOLD & TOILETRIES`
          },
          {
            'content_type': 'text',
            'title': 'HOUSEHOLD CLEANING',
            'payload': `HOUSEHOLD CLEANING`
          },
          {
            'content_type': 'text',
            'title': 'MEAT & POULTRY',
            'payload': `MEAT & POULTRY`
          }
        ]
      })
    // } else {
    //   bot.reply(message, {
    //     'attachment': productsListAttachment,
    //     'quick_replies': [
    //       {
    //         'content_type': 'text',
    //         'title': 'See previous',
    //         'payload': `go_to_previous_page ${pageNumber}`
    //       },
    //       backToMainMenuButton,
    //       {
    //         'content_type': 'text',
    //         'title': 'See next',
    //         'payload': `go_to_next_page ${pageNumber}`
    //       }
    //     ]
    //   })
    // }
  }
  // function showingCatalog (bot, message, page) {
  //   let pageNumber = page || 1
  //   const productsList = require('../products.json')

  //   const createProductsListAttachment = function (data) {
  //     const products = data
  //     const objectToCreate = {}

  //     objectToCreate.type = 'template'
  //     objectToCreate.payload = {}
  //     objectToCreate.payload.template_type = 'generic'
  //     objectToCreate.payload.elements = []

  //     let k

  //     if (pageNumber === 1) {
  //       k = 0
  //     } else if (pageNumber === 2) {
  //       k = 10
  //     } else if (pageNumber === 3) {
  //       k = 20
  //     } else {
  //       k = 0
  //       pageNumber = 1
  //     }

  //     for (let i = k; i < (k + 10); i++) {

  //       if (products[i]) {

  //         const productName = products[i].title
  //         const productImageURL = products[i].img

  //         objectToCreate.payload.elements[i - k] = {}
  //         objectToCreate.payload.elements[i - k].title = `R ${products[i].price}`
  //         objectToCreate.payload.elements[i - k].subtitle = productName
  //         objectToCreate.payload.elements[i - k].image_url = productImageURL
  //         objectToCreate.payload.elements[i - k].buttons = [
  //           {
  //             'type': 'postback',
  //             'title': 'Add to basket',
  //             'payload': `add_to_favourites ${products[i].id}`
  //           },
  //           // {
  //           //   'type': 'postback',
  //           //   'title': `Buy in one click for ${products[i].price} ZAR`,
  //           //   'payload': `buy_product ${products[i].id} ${products[i].price}`
  //           // }
  //         ]
  //       }
  //     }

  //     return objectToCreate
  //   }

  //   const productsListAttachment = createProductsListAttachment(productsList)

  //   if (pageNumber === 1) {
  //     bot.reply(message, {
  //       'attachment': productsListAttachment,
  //       'quick_replies': [backToMainMenuButton,
  //         {
  //           'content_type': 'text',
  //           'title': 'See more products',
  //           'payload': `go_to_next_page ${pageNumber}`
  //         }]
  //     })
  //   } else {
  //     bot.reply(message, {
  //       'attachment': productsListAttachment,
  //       'quick_replies': [
  //         {
  //           'content_type': 'text',
  //           'title': 'See previous',
  //           'payload': `go_to_previous_page ${pageNumber}`
  //         },
  //         backToMainMenuButton,
  //         {
  //           'content_type': 'text',
  //           'title': 'See next',
  //           'payload': `go_to_next_page ${pageNumber}`
  //         }
  //       ]
  //     })
  //   }
  // }
}
