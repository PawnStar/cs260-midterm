const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.DB || 'mongodb://localhost/cs260midterm')
connection.on('open', ()=>console.log('Mongo connected'))
connection.on('error', err=>{
  console.error(err)
  process.exit(1)
})

const db = {
  session: connection.model('Session', require('./session')),
  item: connection.model('Item', require('./item')),
  cart: connection.model('Cart', require('./cart'))
}

module.exports = db;