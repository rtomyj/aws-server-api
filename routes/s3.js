let router = require('express').Router()
let AWS = require('aws-sdk')

function createS3Instance(headers, res)
{
	let { accesskeyid, secretaccesskey, bucket, key } = headers
	console.log(headers)

	if (accesskeyid === '' || secretaccesskey === '' || bucket === '' || key === '')
	{
		res.status(400)
		res.send('required params are empty')
	}

	if (accesskeyid == null || secretaccesskey == null || bucket == null || key == null)
	{
		res.status(400)
		res.send('required params are null')
	}


	let config =
	{
		'accessKeyId': accesskeyid
		, 'secretAccessKey': secretaccesskey
	}
	AWS.config.update(config)


	let params = { Bucket: bucket }
	return new AWS.S3({ maxRetries: 1, params: params })
}


router.get('/file', function (req, res)
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


router.get('/fileList', function(req, res)
{
	let files = []
	s3Instance = createS3Instance(req.headers, res)
	s3Instance.listObjectsV2({ Delimiter: '/', Prefix: '' }, function(err, data)
	{
		if (err)
		{
			console.log(err, err.stack)
		}
		else
		{
			const contents = { files: [], folders: [] }

			const files = data.Contents
			for (file of files)
			{
				let content = {}
				content.name = file.Key
				content.lastModified = file.LastModified
				content.size = file.Size

				contents.files.push(content)
			}

			const folders = data.CommonPrefixes
			for (folder of folders)
			{
				let content = {}
				content.name = folder.Prefix

				contents.folders.push(content)
			}


			res.send(contents)
		}

	})
})

module.exports = router
