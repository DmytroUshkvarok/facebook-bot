const Customer = require('./customer');

const mainMenuButton = {
    'content_type': 'text',
    'title': 'To main menu',
    'payload': 'main_menu',
};

const shopButton = {
    'content_type': 'text',
    'title': 'Go to shop',
    'payload': 'shop',
};

const favouritesButton = {
    'content_type': 'text',
    'title': 'To favourites',
    'payload': 'favourites',
};


module.exports = function(bot, payloadMessage) {

    const message = payloadMessage;
    const msgId = message.sender.id;
    const payloadFavouriteSKU = message.payload.split(' ')[1];

    Customer.findOne({messenger_id: `${msgId}`}).exec(function(err, customer) {

        if (err) return console.log(err);

        if (!customer) {

            console.log(`No have customers with id ${msgId} in base. Adding new customer in base.`);

            Customer.create({messenger_id: `${msgId}`, favourites: [`${payloadFavouriteSKU}`]});

            console.log(`New customer was successfully added to base.`);

            return bot.reply(message, {
                'text': 'New customer profile was created. This product was added to your favourites',
                'quick_replies': [mainMenuButton, shopButton, favouritesButton]
            });

        } else {

            if (!customer.favourites) {

                console.log(`This customer have no products added to favourites. Adding first product.`);
        
                customer.favourites = [`${payloadFavouriteSKU}`];

                return customer.save(function(err) {
        
                    if (err) return console.log(err);

                    console.log(`Customers favourites were successfully created with one product.`);

                    return bot.reply(message, {
                        'text': 'Added to favourites',
                        'quick_replies': [mainMenuButton, shopButton, favouritesButton]
                    });
                });

            } else {
        
                if (~customer.favourites.indexOf(`${payloadFavouriteSKU}`)) {
        
                    return bot.reply(message, {
                        'text': `This product is already in favourites. have no reason to add one more.`,
                        'quick_replies': [mainMenuButton, shopButton, favouritesButton]
                    });

                } else {
        
                    customer.favourites.push(`${payloadFavouriteSKU}`);
                    return customer.save(function(err) {
        
                        if (err) return console.log(err);
        
                        console.log(`Customers favourites were successfully updated.`);

                        return bot.reply(message, {
                            'text': 'Added to favourites',
                            'quick_replies': [mainMenuButton, shopButton, favouritesButton]
                        });
                    });
                }
            }
        }
    });
};
