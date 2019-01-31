const mongoose = require('mongoose')

mongoose.connect(`${process.env.mongodb_uri}`, {
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: 'fb-botkit-bot'
}).catch(err => console.log('Mongo connection error', err))

module.exports = { mongoose }
