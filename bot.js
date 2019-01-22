// var env = require('node-env-file');
// env(__dirname + '/.env');

var winston = require('winston');

var options = {
    file: {
      level: 'info',
      name: 'file.info',
      filename: `./logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    errorFile: {
      level: 'error',
      name: 'file.error',
      filename: `./logs/error.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};


var Botkit = require('botkit');
var debug = require('debug')('botkit:main');
// var mongoUri = process.env.mongodb_uri;
// var mongoStorage = require(__dirname + '/components/botkit_mongo_storage.js')({mongoUri: mongoUri});

var controller = Botkit.facebookbot({
    verify_token: process.env.verify_token,
    access_token: process.env.page_token,
    stats_optout: true,
    debug: true,
    logger: winston.createLogger({
        transports: [
          new (winston.transports.Console)(options.console),
          new (winston.transports.File)(options.errorFile),
          new (winston.transports.File)(options.file)
        ],
        exitOnError: false, // do not exit on handled exceptions
      }),
      require_delivery: true,
      validate_requests: true,
      storage: mongoStorage
});

var webserver = require(__dirname + '/components/express_webserver.js')(controller);
require(__dirname + '/components/subscribe_events.js')(controller);
require(__dirname + '/components/facebook_settings.js')(controller);
require(__dirname + '/components/skills.js')(controller);






