const router = require('express').Router()
const createS3Instance = require('./config')


router.post('/bucket/file', (req, res) =>
{
	let filename = req.headers.key
	s3Instance = createS3Instance(req.headers)
	s3Instance.getObject({ Key: filename }, function(err, data)
	{
		if(err)
		{
			console.log(err, err.stack)
			res.status(404)
			res.send('unable to find resource')
		}
		else
		{
			res.set({ "Content-Disposition": `attachment filename=${filename}` })
			res.send(data.Body)
		}
	})
})

module.exports = router
