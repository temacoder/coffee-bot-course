const { InlineKeyboard } = require('../buttons')
const products = require('../products.json')
const messages = require('../messages.json')

module.exports.CallbackHandler = (bot, db) => {
  bot.on('callback_query', async (ctx) => {
    const { callbackQuery, session } = ctx

    if (callbackQuery.data  === 'back') {
      await ctx.editMessageReplyMarkup()
      await ctx.reply(messages.start, InlineKeyboard.start())
    }


  })
}