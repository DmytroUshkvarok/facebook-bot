const Customer = require('./db/customer_schema')

module.exports = function (message) {
  const msgId = message.sender.id
  const productSKU = message.payload.split(' ')[1]
  const productPrice = message.payload.split(' ')[2]
  Customer.findOne({ messenger_id: `${msgId}` }).exec(function (err, customer) {
    if (err) return console.log(err)
    if (!customer) {
      console.log(`No have customers with id ${msgId} in base. Adding new customer in base.`)
      Customer.create({
        messenger_id: `${msgId}`,
        purchases: [{ 
          product: `${productSKU}`,
          price: `${productPrice}`}]
        })
      console.log(`New customer profile was created. Product was added to purchases`)
    } else {        
      if (customer.purchases.length === 0) {
        console.log(`This customer have no products added to purchases. Adding first product.`)
        customer.purchases = [{ product: `${productSKU}`, price: `${productPrice}`}]
        return customer.save(function (err) {
          if (err) return console.log(err)
          console.log(`Customers purchases were successfully created with one product.`)
        })
      } else {
          customer.purchases.push({ product: `${productSKU}`, price: `${productPrice}`})
          return customer.save(function (err) {
            if (err) return console.log(err)
            console.log(`Customers purchases were successfully updated.`)
          })
      }
    }
  })
}
