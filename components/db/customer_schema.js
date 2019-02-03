const { mongoose } = require('./mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
  messenger_id: {
    type: String,
    required: true,
    unique: true
  },
  invitations: [String],
  favourites: {
    type: [String]
  },
  purchases: [{
      product: String,
      price: String,
      phone: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      date: { type: Date, default: Date.now }
    }]
}, { versionKey: false })

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
