const express = require('express')
const cookieSession = require('cookie-session')
const db = require('./db')

const app = express()

// Load config
let config = {}
try{ config = require('./config.json') } catch(e){}

// Cookies -> Session variable
app.use(cookieSession({
  name: 'midterm-session',
  secret: config.cookieSecret || 'midtermCookieEncryptionSecret',
  maxAge: 12 * 60 * 60 * 1000 // 12 hours
}))

// Look up session, carts, etc
app.use(async (req, _, next)=>{
  try{
    // Look up session in database
    let session = await db.session.findOne({_id: req.session._id})

    // Skip invalid sessions
    if(!session){
      let session = new db.session({
        purchases: []
      })

      await session.save()

      req.session._id = session._id;
    }

    req.dbSession = session;

    // Look up carts
    const carts = await db.cart.find({'_id': { $in: session.purchases}})
    req.carts = carts;

    // Pass up middleware chain
    return next()
  } catch (e) {
    next(e)
  }
})

// Routes
app.use('/api', require('./api'))
app.use('/api/user', require('./api/user'))
app.use('/api/items', require('./api/items'))
app.use(express.static('build'))

// Error handler
const err = (message, status)=>{let err = new Error(message); err.status = status || 500; return err}
app.use((_,__,next)=>next(err('Not found', 404)))

app.use((err, req, res, next)=>{
  res.status(err.status || 500)

  if(process.env.NODE_ENV === 'production')
    delete err.stack

  res.json({message: err.message, stack: err.stack})
})

// Start server
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log('Express server listening on port ' + port))
