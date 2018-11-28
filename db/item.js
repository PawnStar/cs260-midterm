const {Schema} = require('mongoose')

const item = new Schema({
  name: {type: String, required: true, unique: true},
  image: {type: String, required: true},
  price: {type: Number, required: true}
})

module.exports = item;