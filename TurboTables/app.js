var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
var repo = require('./repository');

//Load the data
var configurationFile = 'customer.json';
var customers = JSON.parse(
    fs.readFileSync(configurationFile, 'utf8')
);
repo.loadCustomers(customers);

var app = express();

// Setup view engine and helpers (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var blocks = {};
hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});
hbs.registerHelper('contentFor', function (name, options) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(options.fn(this));
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup route scripts and routes
var routes = require('./routes/index');
var customerapi = require('./routes/api/customer');
var customer = require('./routes/customer');
var pager = require('./routes/pager');

app.use('/', routes);
app.use('/customer', customer);
app.use('/pager', pager);
app.use('/api/customer', customerapi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Start server
app.set('port', process.env.PORT);
http.createServer(app).listen(app.get('port'), function () {
});

console.log('Express server listening on port: ' + app.get('port'));

module.exports = app;