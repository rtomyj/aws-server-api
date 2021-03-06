const express = require('express')
const app = express()

const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')

const { handleRedirect, configureServer } = require('./app.http')

const baseApiUri = '/api/v1'
const baseS3Uri = `${baseApiUri}/s3`
const baseRouterPath = './routes'
const baseS3RouterPath = `${baseRouterPath}/s3`



require('dotenv').config()

app.use(logger('dev'))
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(cookieParser())

/*
	handles pre-flight
	server will return the allowed CORS functionality and stop processing the rest of the request, ie prevents error due to redirects in pre-flight
	Should be one of the first middleware added.
*/
app.options( '*', cors() )
app.use( cors() )	// opens up all CORS settings to clients

handleRedirect(app)


app.use(`${baseApiUri}/testcall`, require(`${baseRouterPath}/testcall`))
app.use(baseS3Uri, require(`${baseS3RouterPath}/content`))
app.use(baseS3Uri, require(`${baseS3RouterPath}/bucket`))
app.use(baseS3Uri, require(`${baseS3RouterPath}/file`))

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	res.status(404)
	res.send('endpoint does not exist')
})


// error handler
app.use(function (err, req, res, next)
{
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	console.log(err)

	res.send('err')
})


configureServer(app)

module.exports = app