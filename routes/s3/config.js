
const AWS = require('aws-sdk')

const createS3Instance = (creds, s3Params) =>
{
	const { accessKeyId, secretAccessKey } = creds
	const endpoint = ( creds.endpoint === "" || creds.endpoint === undefined ) ? undefined : creds.endpoint
	AWS.config.update( {
		credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
		endpoint: endpoint
	} )
	console.log(AWS.config.credentials)

	return new AWS.S3({ maxRetries: 1, params: s3Params })
}

const cleanup = () => {
	AWS.config.update( {
		credentials: new AWS.Credentials( undefined, undefined ),
		endpoint: undefined
	} )

	console.log(AWS.config.credentials)
}


module.exports = {
	createS3Instance,
	cleanup
}