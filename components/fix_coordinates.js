const Customer = require('./db/customer_schema')

module.exports = function (message) {
  const msgId = message.sender.id
  const customersLatitude = message.attachments[0].payload.coordinates.lat
  const customersLongitude = message.attachments[0].payload.coordinates.long

  Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
    if (err) return console.log(err)
    customer.purchases[customer.purchases.length - 1].coordinates.latitude = customersLatitude
    customer.purchases[customer.purchases.length - 1].coordinates.longitude = customersLongitude
    return customer.save(function (err) {
      if (err) return console.log(err)
      console.log(`Customer's coordinates were successfully updated.`)
    })
  })
}
