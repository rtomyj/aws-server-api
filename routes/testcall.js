let router = require('express').Router()

/* GET home page. */
router.get('/', function(req, res, next)
{
	console.log('testcall pinged')
	res.send('api up and running')
})

module.exports = router
