let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let fs = require('fs')
let https = require('https')
let http = require('http');

let app = express()

let options = {
	key: fs.readFileSync(__dirname + '/certs/aws_server.key', 'utf8'),
	cert: fs.readFileSync(__dirname + '/certs/aws_server.crt', 'utf8')
}


app.use(function (req, res, next) {
	if (!req.secure)
	{
		let redirect = 'https://' + req.headers.host + req.url
		console.log('making connection secure - redirecting')
		res.redirect(redirect)
	}
	next()
});

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(allowCors = (req, res, next) =>
{
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesskeyid, secretaccesskey, bucket, key");
	next();
});

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


https.createServer(options, app).listen(443);
http.createServer(app).listen(80);

module.exports = app
