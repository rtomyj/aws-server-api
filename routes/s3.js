let router = require('express').Router()
let AWS = require('aws-sdk')

function createS3Instance(headers, res)
{
	let { accesskeyid, secretaccesskey, bucket, key } = headers

	if (accesskeyid === '' || secretaccesskey === '' || bucket === '' || key === '')
	{
		res.status(400)
		res.send('missing header param')
	}

	if (accesskeyid == null || secretaccesskey == null || bucket == null || key == null)
	{
		console.log('hi')
		res.status(400)
		res.send('missing header param')
	}


	let config =
	{
		'accessKeyId': accesskeyid
		, 'secretAccessKey': secretaccesskey
	}
	AWS.config.update(config)


	let params = { Bucket: bucket}
	return new AWS.S3({ maxRetries: 1, params: params })
}


router.get('/file', function (req, res, next)
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


router.get('/fileList', function(req, res, next)
{
	let files = []
	s3Instance = createS3Instance(req.headers, res)
	s3Instance.listObjectsV2({  }, function(err, data)
	{
		if (err)
		{
			console.log(err, err.stack)
		}
		else
		{
			//console.log(data.Contents)
			for (content of data.Contents)
			{
				let file = {}
				file.name = content.Key
				file.lastModified = content.LastModified
				file.size = content.Size
				files.push(file)
			}
			res.send(files)
		}

	})
})

module.exports = router
