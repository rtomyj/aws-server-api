var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

function allowCors(req, res, next)
{
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesskeyid, secretaccesskey, bucket, key");
	next();
}
app.use(allowCors);

app.use((req, res, next) => {
	res.header('Content-Type', 'application/json')
	next()
})

app.use('/', require('./routes/index'))
app.use('/s3', require('./routes/s3'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404)
	res.send('invalid endpoint')
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
})


app.set('port', 9999);
app.listen(app.get('port'))

module.exports = app
