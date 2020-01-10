const router = require('express').Router()
const { createS3Instance, cleanup } = require('./config')


router.post('/bucketList', ( req, res ) => {
	const creds = req.body
	console.log(creds)

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
			console.log('hello')
			res.json( data )
		}
	} )
})

module.exports = router