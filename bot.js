const env = require('node-env-file');
env(__dirname + '/.env');

const Botkit = require('botkit');
const debug = require('debug')('botkit:main');
const mongoUri = process.env.mongodb_uri;
const winston = require('winston');
const mongoStorage = require(__dirname + '/components/botkit_mongo_storage.js')({mongoUri: mongoUri});

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
      validate_requests: true,
      storage: mongoStorage
});

const webserver = require(__dirname + '/components/express_webserver.js')(controller);
require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/facebook_settings.js')(controller);
require(__dirname + '/components/skills.js')(controller);