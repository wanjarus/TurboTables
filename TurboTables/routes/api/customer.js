//REST web service for Customer
var express = require('express');
var router = express.Router();
var url = require('url');
var repo = require('../../repository');
var delayAll = 0;
var delayPaged = 0;

router.get('/', function (req, res) {
     var query = url.parse(req.url, true).query;
     if (isEmpty(query)) {
          //simulate network delay
          setTimeout(function () {
               res.send(repo.findAllCustomers());
          }, delayAll);
     }
     else {
          //simulate network delay
          setTimeout(function () {
               if (query.sortColumn)
                    res.send(repo.findAllCustomersPagedByOrder(query.page, query.pageSize, query.sortColumn, query.direction));
               else
                    res.send(repo.findAllCustomersPaged(query.page, query.pageSize));
          }, delayPaged);
     }
});
router.post('/', function (req, res) {
    var customer = {
        Id: -1,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Address1: "4201 Disney Blvd. ",
        Address2: "Unit 100",
        Notes: "No notes",
        ZipCode: "32822",
        HomePhone: "4072581111",
        WorkPhone: "4072581111",
        CellPhone: "4073171111",
        EMail: req.body.EMail,
        CityId: 10,
        Active: true,
        ModifiedDt: "\/Date(1397410500000)\/",
        CreateDt: "\/Date(1397410500000)\/"
    };
    repo.addCustomer(customer);
    //Send resource creatd and redirect
    res.redirect(201, '/');
});
router.get('/:id', function (req, res) {
        res.send(repo.findCustomerById(parseInt(req.params.id,10)));
});

function isEmpty(obj) {
     return (Object.keys(obj).length === 0);
}

module.exports = router;