const { InlineKeyboard } = require('../buttons')
const messages = require('../messages.json')

module.exports.TextHandler = (bot, db) => {
  bot.on('text', async (ctx) => {
    const { session } = ctx
    const text = ctx.message.text

    if (session.step === 'fio') {

      session.step = 'phone'
      session.name = text
      await ctx.replyWithHTML(messages['phone-number'])

    } else if (session.step === 'phone') {

      session.step = 'email'
      session.phone = text
      await ctx.replyWithHTML(messages.email)

    } else if (session.step === 'email') {

      session.step = 'payments'
      session.email = text
      await ctx.replyWithHTML(messages.payments, InlineKeyboard.payments())

    }

  })

}