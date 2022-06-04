const Telegraf = require('telegraf')
const { Markup } = Telegraf

const products = require('./products.json')

module.exports.InlineKeyboard = {
  start: () => {
    return Markup.inlineKeyboard([
      [ Markup.button.callback('Кофе для эспрессо', 'espresso') ],
      [ Markup.button.callback('Кофе для фильтра', 'filter') ]
    ])
  },
  coffee: (id) => {
    const product = getProduct(id)
    return JSON.stringify({
      inline_keyboard: [
          [{text: `Купить ${product.weight.small}гр - ${product.price.small}руб`, callback_data: `${product.type}-${product.weight.small}-${product.price.small}`}],
          [{text: `Купить ${product.weight.big}гр - ${product.price.big}руб`, callback_data: `${product.type}-${product.weight.big}-${product.price.big}`}],
          [{text: '⬅️ На главную', callback_data: 'back'}]
      ],
      resize_keyboard: true,
    })
  },
  back: () => {
    return Markup.inlineKeyboard([
      [ Markup.button.callback('⬅️ На главную', 'back') ]
    ])
  },
}

const getProduct = (id) => {
  return products[id]
}