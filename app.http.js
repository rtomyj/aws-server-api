
let fs = require('fs')
let https = require('https')
let http = require('http')
require('dotenv').config()

let httpConfig = function(app)
{
	let options = {
		key: fs.readFileSync(__dirname + '/certs/aws_server.key', 'utf8'),
		cert: fs.readFileSync(__dirname + '/certs/aws_server.crt', 'utf8')
	}


	app.use(function (req, res, next)
	{
		if (!req.secure)
		{
			let redirect = 'https://' + req.headers.host + req.url
			console.log('making connection secure - redirecting')
			res.redirect(redirect)
		}
		next()
	})

	https.createServer(options, app).listen(process.env.HTTPS_PORT)
	http.createServer(app).listen(process.env.HTTP_PORT)
}

module.exports = httpConfig