const debug = require('debug')('botkit:skills');
const bbyApiKey = process.env.bby_api_key;
const bby = require('bestbuy')(bbyApiKey);

module.exports = function(controller) {

    const bot = controller.spawn({
    });

    const mainMenu = {
        text: 'MAIN MENU',
            quick_replies: 
            [{
              content_type: 'text',
              title: 'My purchases',
              payload: 'purchases',
            },
            {
              content_type: 'text',
              title: 'Shop',
              payload: 'shop',
            },
            {
              content_type: 'text',
              title: 'Favourites',
              payload: 'favourites',
            },
            {
              content_type: 'text',
              title: 'To invite a friend',
              payload: 'invitation',
            }]
    };

    const backToMainMenuButton = {
        content_type: 'text',
        title: 'To main menu',
        payload: 'main_menu',
    };

    const seeMoreProductsButton = {
        content_type: 'text',
        title: 'See more products',
        payload: 'see_more_products',
    };

    function showMainMenu(bot, message) {
        bot.reply(message, mainMenu);
    }

    controller.on('facebook_postback, message_received', function(bot, message) {

        if (message.quick_reply) {

            if (message.quick_reply.payload == 'main_menu') {

                showMainMenu(bot, message);
            }

            if (message.quick_reply.payload == 'shop') {

                bby.products('search=headphones', {
                    format: 'json',
                    show: 'name,image,sku'
                  }, function (err, data) {
                    
                    if (err) {
                        console.warn(err);
                    }
                    
                    const createProductsListAttachment = function(data) {
                        
                        let i;
                        let objectToCreate = {};
                        objectToCreate.type = 'template';
                        objectToCreate.payload = {};
                        objectToCreate.payload.template_type = 'generic';
                        objectToCreate.payload.elements = [];

                        for (i = 0; i < 1; i++) {
                            
                            const productName = data.products[i].name;
                            const productImageURL = data.products[i].image;
                            objectToCreate.payload.elements[i] = {};
                            objectToCreate.payload.elements[i].title = productName;
                            objectToCreate.payload.elements[i].image_url = productImageURL;
                            objectToCreate.payload.elements[i].buttons = [
                                {
                                    'type':'postback',
                                    'title':'View more',
                                    'payload':`view_more ${data.products[i].sku}`,
                                }
                            ];
                        }

                        return objectToCreate;
                    };
                    
                    const productsListAttachment = createProductsListAttachment(data);


                    bot.reply(message, {
                        "attachment": productsListAttachment,
                        "quick_replies": [backToMainMenuButton, seeMoreProductsButton]
                    });

                  });
            }

        } else if (message.payload == 'start_button_clicked' || message.payload == 'main_menu') {
        
            showMainMenu(bot, message);

        } else if (~message.payload.indexOf('view_more')) {

            console.log(message.payload.slice(message.payload.indexOf(' ') + 1));

            
        }
    })
        
};


