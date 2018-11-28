const router = require('express-promise-router')();
const bodyParser = require('body-parser')

const db = require('../db')

router.get('/purchases', async (req, res)=>{
  res.json(req.carts)
})

router.post('/purchase', bodyParser.json(), async (req, res)=>{
  const items = req.body;

  // Create new cart
  const cart = new db.cart({ items })
  await cart.save()

  // Save it to the user's session
  const session = req.dbSession;
  session.purchases.push(cart)
  await session.save()

  res.json(cart)
})

module.exports = router;
