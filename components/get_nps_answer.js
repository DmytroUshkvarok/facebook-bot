const Customer = require('./db/customer_schema')

module.exports = function (message) {
  const msgId = message.sender.id
  const npsIndex = message.payload.split(' ')[1]
  
  Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
    if (err) return console.log(err)
    const arrayOfFinishedPurchases =  customer.purchases.filter(function (obj) {
      if (obj.coordinates.latitude && obj.coordinates.longitude) {
        return true
      }
    })
    arrayOfFinishedPurchases[arrayOfFinishedPurchases.length - 1].nps_index = npsIndex
    return customer.save(function (err) {
      if (err) return console.log(err)
      console.log(`Customer's NPS index was successfully updated.`)
    })
  })
}
