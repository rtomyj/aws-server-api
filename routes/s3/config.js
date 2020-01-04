
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


module.exports = createS3Instance