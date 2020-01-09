
const AWS = require('aws-sdk')

const createS3Instance = (creds, s3Params) =>
{
	const { accessKeyId, secretAccessKey } = creds
	const s3BucketEndpoint = (creds.s3BucketEndpoint === "" || creds.s3BucketEndpoint === undefined) ? false : creds.s3BucketEndpoint
	AWS.config.update( {
		credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
		s3BucketEndpoint: s3BucketEndpoint
	} )
	//console.log(AWS.config)

	return new AWS.S3({ maxRetries: 1, params: s3Params })
}

const cleanup = () => {
	AWS.config.update( {
		credentials: new AWS.Credentials( undefined, undefined ),
		s3BucketEndpoint: false
	} )

	console.log(AWS.config)
}


module.exports = {
	createS3Instance,
	cleanup
}