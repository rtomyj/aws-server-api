const router = require('express').Router()

const testcallMessage = 'api up and running'

/* GET home page. */
router.get('/', function(req, res, next)
{
	console.log( testcallMessage )
	res.json( testcallMessage )
})

module.exports = router
