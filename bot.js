const Botkit = require('botkit');
const debug = require('debug')('botkit:main');
const winston = require('winston');

const controller = Botkit.facebookbot({
    verify_token: process.env.verify_token,
    access_token: process.env.page_token,
    stats_optout: true,
    debug: true,
    logger: winston.createLogger({
      levels: winston.config.syslog.levels,
      transports: [
        new (winston.transports.Console)({level: 'debug'}),
        new (winston.transports.File)({ filename: './logs/bot.log' })
      ]
    }),
      require_delivery: true,
      validate_requests: true
});

const webserver = require(__dirname + '/components/express_webserver.js')(controller);
require(__dirname + '/components/db/mongoose.js');

require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/facebook_settings.js')(controller);
require(__dirname + '/components/skills.js')(controller);

