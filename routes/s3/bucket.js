const router = require('express').Router()
const { createS3Instance, cleanup } = require('./config')


router.post('/buckets', ( req, res ) => {
	const creds = req.body

	const awsConn = createS3Instance( creds, {} )
	awsConn.listBuckets( {}, ( err, data ) => {
		cleanup()
		if ( err )
		{
			console.log(`Err occurred while fetching bucket list: ${ err }`)
			res.json( err )
		}
		else
		{
			res.json( data )
		}
	} )
})

module.exports = router