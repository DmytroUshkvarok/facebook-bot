module.exports = function (bot, message) {
  const attachment = (function () {
    let i
    const objectToCreate = {}

    objectToCreate.type = 'template'
    objectToCreate.payload = {}
    objectToCreate.payload.template_type = 'generic'
    objectToCreate.payload.elements = []

    for (i = 0; i < 10; i++) {
      objectToCreate.payload.elements[i] = {}
      objectToCreate.payload.elements[i].title = `${i + 1}`
      objectToCreate.payload.elements[i].buttons = [
        {
          'type': 'postback',
          'title': `Send ${i + 1}`,
          'payload': `nps ${i + 1}`
        }
      ]
    }
    return objectToCreate
  }())
  bot.reply(message, `Please tell me, did you like the product? How do you estimate, recommend our product to your friends?`)
  bot.reply(message, {
    'attachment': attachment
  })
}
