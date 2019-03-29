const bbyApiKey = process.env.bby_api_key
const bby = require('bestbuy')(bbyApiKey)
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
      if (message.referral) {
        require('./referral.js')(bot, message)
      }
      showMainMenu(bot, message)
    }
  })

  controller.on('facebook_referral', function (bot, message) {
    require('./referral.js')(bot, message)
    showMainMenu(bot, message)
  })

  controller.on('facebook_postback', function (bot, message) {
    if (message.payload === 'catalog') {
      showingCatalog(bot, message)
    }
  })

  controller.on('facebook_postback, message_received', function (bot, message) {
    if (message.quick_reply) {
      if (message.quick_reply.payload === 'main_menu') {
        showMainMenu(bot, message)
      }
      if (message.quick_reply.payload === 'shop') {
        showingCatalog(bot, message)
      }
      if (message.quick_reply.payload === 'back_to_catalog') {
        showingCatalog(bot, message)
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
    } else if (typeof (message.payload) === 'string' && ~message.payload.indexOf('pay_for_all')) {
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
        require('./fix_phone.js')(message)
        bot.reply(message, {
          'text': 'Please share your location for delivery',
          'quick_replies': [{ 'content_type': 'location' }, backToMainMenuButton]
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
            }, backToMainMenuButton
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
      require('./fix_coordinates.js')(message)
      bot.reply(message, {
        'text': 'Congratulations! Our courier will contact you within 2 hours',
        'quick_replies': [backToMainMenuButton, showCatalogButton]
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
  
  function showingCatalog (bot, message, page) {
    let pageNumber = page || 1
    const productsList = require('../products.json')

    const createProductsListAttachment = function (data) {
      const products = data
      const objectToCreate = {}

      objectToCreate.type = 'template'
      objectToCreate.payload = {}
      objectToCreate.payload.template_type = 'generic'
      objectToCreate.payload.elements = []

      let k

      if (pageNumber === 1) {
        k = 0
      } else if (pageNumber === 2) {
        k = 10
      } else if (pageNumber === 3) {
        k = 20
      } else {
        k = 0
        pageNumber = 1
      }

      for (let i = k; i < (k + 10); i++) {

        if (products[i]) {

          const productName = products[i].title
          const productImageURL = products[i].img

          objectToCreate.payload.elements[i - k] = {}
          objectToCreate.payload.elements[i - k].title = productName
          objectToCreate.payload.elements[i - k].subtitle = `${products[i].price} ZAR`
          objectToCreate.payload.elements[i - k].image_url = productImageURL
          objectToCreate.payload.elements[i - k].buttons = [
            {
              'type': 'postback',
              'title': 'Add to basket',
              'payload': `add_to_favourites ${products[i].id}`
            },
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

    if (pageNumber === 1) {
      bot.reply(message, {
        'attachment': productsListAttachment,
        'quick_replies': [backToMainMenuButton,
          {
            'content_type': 'text',
            'title': 'See more products',
            'payload': `go_to_next_page ${pageNumber}`
          }]
      })
    } else {
      bot.reply(message, {
        'attachment': productsListAttachment,
        'quick_replies': [
          {
            'content_type': 'text',
            'title': 'See previous',
            'payload': `go_to_previous_page ${pageNumber}`
          },
          backToMainMenuButton,
          {
            'content_type': 'text',
            'title': 'See next',
            'payload': `go_to_next_page ${pageNumber}`
          }
        ]
      })
    }
  }
}
