
let fs = require('fs')
let https = require('https')
let http = require('http')
require('dotenv').config()

let httpConfig = function(app)
{
	const options = {
		key: fs.readFileSync(__dirname + '/certs/aws_server.key', 'utf8'),
		cert: fs.readFileSync(__dirname + '/certs/aws_server.crt', 'utf8')
	}

	const HTTP_PORT = process.env.HTTP_PORT || 80
	const HTTPS_PORT = process.env.HTTPS_PORT || 443


	app.use(function (req, res, next)
	{
		if (!req.secure)
		{
			let redirect = `https://${req.headers.host}:${HTTPS_PORT}${req.url}`
			console.log( `user requested an unsecured resource - redirecting to: ${redirect}` )

			res.redirect(redirect)
		}
		next()
	})

	https.createServer(options, app).listen(process.env.HTTPS_PORT || HTTPS_PORT)
	http.createServer(app).listen(process.env.HTTP_PORT || HTTP_PORT)
}

module.exports = httpConfig