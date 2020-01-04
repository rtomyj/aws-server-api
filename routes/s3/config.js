
let AWS = require('aws-sdk')

function createS3Instance(headers, params)
{
	let { accesskeyid, secretaccesskey } = headers
	console.log(headers)

	let config =
	{
		'accessKeyId': accesskeyid
		, 'secretAccessKey': secretaccesskey
	}
	AWS.config.update(config)

	return new AWS.S3({ maxRetries: 1, params: params })
}


module.exports = createS3Instance