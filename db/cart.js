const {Schema} = require('mongoose')

const cart = new Schema({
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  purchased: {type: Date, required: true, default: Date.now}
})

module.exports = cart;