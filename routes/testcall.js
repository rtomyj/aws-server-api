let router = require('express').Router()

/* GET home page. */
router.get('/', function(req, res, next)
{
  res.send('api up and running')
})

module.exports = router
