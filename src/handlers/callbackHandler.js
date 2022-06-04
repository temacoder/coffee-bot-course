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


    if (callbackQuery.data.startsWith('espresso-')) {
      const data = callbackQuery.data.split('-')
      const weight = data[1]
      const price = data[2]
      await ctx.editMessageReplyMarkup()
      await ctx.replyWithHTML(`Вы заказали кофе для эспрессо.\nВес - ${weight}гр\nЦена - ${price}руб`, InlineKeyboard.back())
    }

    if (callbackQuery.data.startsWith('filter-')) {
      const data = callbackQuery.data.split('-')
      const weight = data[1]
      const price = data[2]
      await ctx.editMessageReplyMarkup()
      await ctx.replyWithHTML(`Вы заказали кофе для фильтра.\nВес - ${weight}гр\nЦена - ${price}руб`, InlineKeyboard.back())
    }

    if (callbackQuery.data === 'espresso') {
      await ctx.deleteMessage()
      await ctx.telegram.sendPhoto(ctx.chat.id, `${process.env.WEBHOOK}/espresso.png`, { caption: `Для эспрессо\n<b>${products['1'].title}</b>\n${products['1'].description}`, reply_markup: InlineKeyboard.coffee('1'), parse_mode: 'HTML'})
    }

    if (callbackQuery.data === 'filter') {
      await ctx.deleteMessage()
      await ctx.telegram.sendPhoto(ctx.chat.id, `${process.env.WEBHOOK}/filter.png`, { caption: `Для фильтра\n<b>${products['2'].title}</b>\n${products['2'].description}`, reply_markup: InlineKeyboard.coffee('2'), parse_mode: 'HTML'})
    }




  })
}