const router = require('express-promise-router')();
const bodyParser = require('body-parser')

const db = require('../db')

router.get('/', async (req, res)=>{
  let items = await db.item.find({})

  if(req.query.count === 'true')
    items = await Promise.all(items.map(async item=>{
      const orders = await db.cart.find({
        items: item
      })

      const numPerOrder = orders.map(order=>order.items.filter(it=>it.id === item.id).length)

      let strippedItem = item.toObject();
      strippedItem.count = numPerOrder.reduce((a,b)=>(a+b), 0)
      return strippedItem;
    }))

  res.json(items)
})

router.post('/create', bodyParser.json(), async (req, res)=>{
  const item = new db.item({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price
  });
  await item.save();

  res.json(item)
})

router.get('/read/:id', async (req, res)=>{
  const item = await db.item.findOne({_id: req.params.id})

  res.json(item)
})

router.post('/update/:id', bodyParser.json(), async (req, res)=>{
  const item = await db.item.findOne({_id: req.params.id})

  if(req.body.name) item.name = req.body.name;
  if(req.body.image) item.image = req.body.image;
  if(req.body.price) item.price = req.body.price;

  await item.save();

  res.json(item)
})

router.post('/delete/:id', async (req, res)=>{
  await db.item.findOneAndRemove({_id: req.params.id})

  res.json({success: true})
})

module.exports = router;
