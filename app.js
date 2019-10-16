let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let httpConfig = require('./app.http')
let corsConfig = require('./app.cors')

let app = express()
require('dotenv').config()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))



app.use((req, res, next) =>
{
	res.header('Content-Type', 'application/json')
	next()
})

app.use('/testcall', require('./routes/testcall'))
app.use('/s3', require('./routes/s3'))

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
	res.status(404)
	res.send('invalid endpoint')
})

// error handler
app.use(function (err, req, res, next)
{
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
})


corsConfig(app)
httpConfig(app)

module.exports = app