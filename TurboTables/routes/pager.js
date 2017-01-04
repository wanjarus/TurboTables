//Routing for pager web page
var express = require('express');
var router = express.Router();
var request = require('request');
require('request-debug')(request);

var customerRoute = '/api/customer/';
var page = 1;
var pageSize = 5;
var sortColumn = 'Id';
var sortDirection = 'asc';

/* GET default route */
/* http://localhost/pager */
router.get('/', function (req, res, next) {
     //var options = setGetOptions('http://' + req.headers.host + customerRoute + '?page=' + page + '&pageSize=' + pageSize,
     var options = setGetOptions('http://' + req.headers.host + customerRoute + '?page=' + page + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&direction=' + sortDirection,
          {}
     );
     //Call customer REST service
     request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
               var json = JSON.parse(body);
               res.render('pager', { title: 'Paged Customer List', customers: json });
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