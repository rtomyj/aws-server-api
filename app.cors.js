let corsConfig = function (app)
{
	app.use((req, res, next) =>
	{
		res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesskeyid, secretaccesskey, bucket, key")
		next()
	})
}

module.exports = corsConfig