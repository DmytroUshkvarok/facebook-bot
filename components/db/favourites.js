const Customer = require('./customer');

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

            return bot.reply(message, 'New customer profile was created. This product was added to your favourites');

        } else {

            if (!customer.favourites) {

                console.log(`This customer have no products in favourites. Adding first product.`);
        
                customer.favourites = [`${payloadFavouriteSKU}`];

                return customer.save(function(err) {
        
                    if (err) return console.log(err);

                    console.log(`Customers favourites were successfully created with one product.`);

                    return bot.reply(message, 'Added to favourites');
                });

            } else {
        
                if (~customer.favourites.indexOf(`${payloadFavouriteSKU}`)) {
        
                    return bot.reply(message, `This product is already in favourites. have no reason to add one more.`);

                } else {
        
                    customer.favourites.push(`${payloadFavouriteSKU}`);
                    return customer.save(function(err) {
        
                        if (err) return console.log(err);
        
                        console.log(`Customers favourites were successfully updated.`);

                        return bot.reply(message, 'Added to favourites');
                    });
                }
            }
        }
    });
};
