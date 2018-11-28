const {Schema} = require('mongoose')

const session = new Schema({
  purchases: [{type: Schema.Types.ObjectId, ref: 'Cart'}]
})

module.exports = session;