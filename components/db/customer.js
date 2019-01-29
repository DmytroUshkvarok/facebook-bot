const {mongoose} = require('./mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    messenger_id: {
        type: String,
        required: true,
        unique: true
    },
    favourites: {
        type: [String]
    }
}, { versionKey: false });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;