const router = require('express').Router()

const testcallMessage = 'api up and running'

/* GET home page. */
router.get('/', function(req, res)
{
	console.log( testcallMessage )
	res.json( testcallMessage )
})

router.post('/', (req, res) => {
	console.log(req.body)
	res.send( testcallMessage )
})

module.exports = router
