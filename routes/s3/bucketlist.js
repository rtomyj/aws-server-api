const router = require('express').Router()
const createS3Instance = require('./config')


router.get('/bucketList', (req, res) => {
	const headers = req.headers

	const awsConn = createS3Instance( headers, {} )
	awsConn.listBuckets( {}, (err, data) => {
		if (err)
		{
			console.log(`Err occurred while fetching bucket list: ${err}`)
			res.json(err)
		}
		else
		{
			res.json(data)
		}
	} )

})

module.exports = router