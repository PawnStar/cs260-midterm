const router = require('express-promise-router')();

const db = require('../db')

router.get('/', async (req, res)=>{
  res.json({hello: 'there'})
})

module.exports = router;