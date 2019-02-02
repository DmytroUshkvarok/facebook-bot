const Customer = require('./db/customer_schema')

module.exports = function (message) {
  const msgId = message.sender.id
  const customerPhone = message.quick_reply.payload;

  Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
    if (err) return console.log(err)
    customer.purchases[customer.purchases.length - 1].phone = customerPhone
    return customer.save(function (err) {
        if (err) return console.log(err)

        console.log(`Customer's phone was successfully updated.`)
      })
  })
}
