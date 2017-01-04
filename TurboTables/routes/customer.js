//Routing for customer web page
var express = require('express');
var router = express.Router();
var request = require('request');
require('request-debug')(request);

var customerRoute = '/api/customer/';
var page = 1;
var pageSize = 21;
var orderBy = 'Id';
var direction = 'asc';

/* GET for add page. */
router.get('/add', function (req, res) {
    res.render('customeradd', { title: 'Add Customer', message: 'Hello', customer: { Id: 0, FirstName: '', LastName: '', EMail: '' } });
});

/* GET home page. */
router.get('/', function (req, res, next) {
     var options = setGetOptions('http://' + req.headers.host + customerRoute + '?page=' + page + '&pageSize=' + pageSize,
        { }
    );
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("status: " + response.statusCode);
            //console.log(body); 
            var json = JSON.parse(body);
            //console.log("json[0].DeviceID: " + json[0].DeviceID);
            //respond with parsed response
            res.render('customer', { title: 'Customer List', message: 'Hello', customers: json });
        }
        else {
            console.log('Error: ' + response.statusCode + ' - ' + error);
        }
    });
});

/* GET by id page. */
router.get('/:id', function (req, res, next) {
    var options = setGetOptions('http://' + req.headers.host + customerRoute + req.params.id,
        {}
    );
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("status: " + response.statusCode);
            //console.log(body); 
            var json = JSON.parse(body);
            //console.log("json[0].DeviceID: " + json[0].DeviceID);
            //respond with parsed response
            res.render('customerdetail', { title: 'Customer Details', message: 'Hello', customer: json });
        }
        else {
            console.log('Error: ' + response.statusCode + ' - ' + error);
        }
    });
});

function setGetOptions(u, q) {
    var options = {
        url: u,
        method: 'GET',
        qs: q
    };
    return options;
};
module.exports = router;