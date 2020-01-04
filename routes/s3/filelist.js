let router = require('express').Router()
const createS3Instance = require('./config')


router.get('/fileList', (req, res) =>
{
	s3Instance = createS3Instance(req.headers, { Bucket: req.headers.bucket } )
	s3Instance.listObjectsV2({ Delimiter: '/', Prefix: '' }, function(err, data)

	{
		if (err)	console.log(err, err.stack)
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
