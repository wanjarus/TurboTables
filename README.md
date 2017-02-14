##Turbo Tables implements basic paging, sorting, and filtering controls to a website using Node, Express, Handlebars, and Bootstrap.
---

A simple javascript library which supports paging, sorting, and filtering table data using Node.js and the Express framework with Handlebars.js and Bootstrap

For more informaton:
* [Node.js](http://Nodejs.org/)
* [Express.js](http://Expressjs.com/)
* [Handlebars.js](http://Handlebarsjs.com/)
* [Bootstrap](https://getbootstrap.com/)

### Usage
1. CSS changes
  * Add CCS links for FontAwesome and TurboTables
```css
<link rel="stylesheet" type="text/css" href="https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css ">
<link rel="stylesheet" type="text/css" href="/stylesheets/turbotables.css" />
```
1. HTML5 <b>table</b> changes
  * Add <b>id</b> attribute to <b>table</b> tag
  * Add <b>ctTotalItems</b> attribute to the <b>table</b> tag
  * Add <b>colHeaders</b> class to <b>tr</b> tag in the table
  * Add <b>sortable</b> to the table header columns <b>class</b> on which you want to sort
  * Additionally, the column header must have an <b>id</b> attribute to be sortable
```html
<div class="row">
    <div class="col-md-12">
        <table id="CustomerTable" ctTotalItems="100" class=”table table-striped tabled-bordered table-condensed table-hover”>
            <thead>
                <tr class="colHeaders">
                    <th id="Id" class="sortable"> <a href="#">ID</a></th>
                    <th id="FirstName" class="sortable"><a href="#">First Name</a></th>
                    <th id="LastName" class="sortable"> <a href="#">Last Name</a></th>
                    <th id="Email" class="sortable"><a href="#">E-Mail</a></th>
                </tr>
            </thead>
            <tbody id="CustomerList">
            </tbody>
	    </table>
    </div>
</div>
```
1. Javascript changes
  * Instantiation
```js
var customerTable = new TurboTablesLib({
    tableId: 'CustomerTable',
    totalItemsAttribute: 'ctTotalItems',
    page: 1,
    pageSize: 10,   
    pagerSizeOptions: [[10, 25, 50, -1],[10, 25, 50, 'All']],    
    sortColumn: 'Id',
    sortDirection: 'asc',
    columnHeaderClass: 'colHeaders',
    spinnerSource: '/images/spinner-128.gif'
}); 
```
  * Data Binding
```js
customerTable.setDataBinding(CustomerList);
```
  * Update refresh logic
```js
     $('#refresh').click(function () {
          CustomerList(customerTable.getPage(), customerTable.getPageSize(), customerTable.getSortColumn(), customerTable.getSortDirection());
     });
```
  * Update REST service call
```js
     function CustomerList(page, pageSize, sortColumn, direction) {
        var requestString = '?page=' + page + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&direction=' + direction;
        var url = baseUrl + 'customer/' + requestString;		
...
...
                if (parseInt(result.totalItems, 10) > 0)
                    bindGrid(gridBodyId, template, result.customers);
                else
                    bindNoRecords(gridBodyId);
                customerTable.endDataBinding(result.totalItems);
            },
            error: function (result, status, xhr) {
                bindNoRecords(gridBodyId);
            }
	    });
    }
	
	function bindGrid(grid, src, data) {
        var result = '{"' + grid + '":' + JSON.stringify(data) + "}";
        var source = $('#' + src).html();
        var template = Handlebars.compile(source);
        var html = template(JSON.parse(result));
        $("#" + grid).html(html);
    }
	
    function bindNoRecords(gridBodyId) {
         var html = '<tr id="noRecordsFound"><td class="lead text-left text-danger" colspan= "4">No Records Found!</td></tr>';
         $("#" + gridBodyId).html(html);
    }			
```
1. Add TurboTables.js to page scripts
```js
<script src="/javascripts/turbotables.js" type="text/javascript"></script>
```
### FAQ
1. Why aren't my columns sorting?
  * The column header must have a header tag ```<a href="#" >columnHeader</a>```
  * The table columns must be marked as sortable
  * The sorting logic must be implemented on the server side
  * The table column must match the property name on the server side
2. Why doesn't the <b>Showing x to y of z entries</b> displayed?
  * Make sure the <b>table</b> is wrapped in Bootstrap row and column <b>div</b> tags