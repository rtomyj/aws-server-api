const router = require('express').Router()
const { createS3Instance } = require('./config')


router.post('/bucket/content', (req, res) =>
{
	const s3Params = { 'Bucket': req.body.bucket }
	let folderIn = req.body.folder

	s3Instance = createS3Instance(req.body, s3Params)
	s3Instance.listObjectsV2({ Delimiter: '/', Prefix: folderIn }, function(err, data)
	{
		if (err)	console.log(err, err.stack)
		else
		{
			const contents = { files: { items: [] }, folders: { items: [] } }

			/* Gets the files at given path */
			for (file of data.Contents)
			{
				let content = {}
				content.name = file.Key
				content.lastModified = file.LastModified
				content.size = file.Size

				contents.files.items.push(content)
			}

			/* Gets the folders at given path */
			for (folder of data.CommonPrefixes)
			{
				let content = {}
				content.name = folder.Prefix

				contents.folders.items.push(content)
			}

			contents.files['count'] = data.Contents.length
			contents.folders['count'] = data.CommonPrefixes.length

			res.send(contents)
		}
	})
})

module.exports = router
