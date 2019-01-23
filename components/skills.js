module.exports = function(controller) {

    const bot = controller.spawn({
    });

    controller.on('facebook_postback, message_received', function(bot, message) {

        if (message.payload == 'start_button_clicked' || message.payload == 'main_menu') {
          
            bot.startConversation(message, function(err, convo) {
                convo.say({
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
                  });
            });
        }
    })

};
