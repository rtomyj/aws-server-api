var express = require('express')
var router = express.Router()
var AWS = require('aws-sdk')

/* GET home page. */
router.get('/', function (req, res, next) {
	let { accesskeyid, secretaccesskey, bucket, key } = req.headers

	let config = {
		'accessKeyId': accesskeyid
		, 'secretAccessKey': secretaccesskey
	}
	AWS.config.update(config)


	let params = {Bucket: bucket, Key: key}
	let s3Instance = new AWS.S3({ maxRetries: 1 })

	s3Instance.getObject(params, function(err, data)  {
		if(err) console.log(err, err.stack); // an error occurred
		else console.log(data.Body.toString());           // successful response
	})


	//res.status('500')
	res.send()
});

module.exports = router;
