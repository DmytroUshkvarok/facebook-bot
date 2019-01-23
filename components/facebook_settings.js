const debug = require('debug')('botkit:facebook_settings');



module.exports = function(controller) {

    debug('Configuring Facebook thread settings...');
    controller.api.thread_settings.greeting('Look to Up and enjoy. More.');
    controller.api.thread_settings.get_started('start_button_clicked');
    controller.api.thread_settings.menu([
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [    
                {
                    "type":"postback",
                    "title":"Main menu",
                    "payload":"main_menu"
                },
                {
                    "type":"postback",
                    "title":"Catalog",
                    "payload":"catalog"
                }
            ]
        }
    ]);
}
