
const fs = require('fs')
const https = require('https')
const http = require('http')
require('dotenv').config()


const HTTP_PORT = process.env.HTTP_PORT || 80
const HTTPS_PORT = process.env.HTTPS_PORT || 443



const handleRedirect = ( app ) =>
{
	app.use( ( req, res, next ) =>
	{
		if ( !req.secure )
		{
			const redirect = `https://${req.headers.host}:${HTTPS_PORT}${req.url}`
			console.log( `User requested an unsecured resource - redirecting to: ${redirect}` )

			res.redirect( redirect )
		}
		else	next()
	})
}



const configureServer = ( app ) =>
{
	const options = {
		key: fs.readFileSync(__dirname + '/certs/aws_server.key', 'utf8'),
		cert: fs.readFileSync(__dirname + '/certs/aws_server.crt', 'utf8')
	}


	console.log(`App starting on port ${ HTTP_PORT } for unsecured connections and ${ HTTPS_PORT } for secured connections`)

	https.createServer( options, app ).listen( HTTPS_PORT )
	http.createServer( app ).listen( HTTP_PORT )
}



module.exports = {
	configureServer: configureServer,
	handleRedirect: handleRedirect
}