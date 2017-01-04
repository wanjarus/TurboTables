$(document).ready(function () {
    var baseUrl = '/api/';
    var totalItems = 0;
    var page = 1;
    var pageSize = 21;
    var orderBy = 'Id';
    var direction = 'asc';

    $('#refresh').click(function () {
        CustomerList();
    });

    function CustomerList() {
        var requestString = '?page=' + page + '&pageSize=' + pageSize;
        var url = baseUrl + 'customer/' + requestString;
        var grid = 'CustomerList';
        var template = 'customerListHGrid';
        //Show the spinner
        $('#spinner').show();
        ajaxGet({
            url: url,
            success: function (result) {
                 jsonresult = result;
                 //Hide the spinner gif
                 $('#spinner').hide();
                 bindGrid(grid, template, result.customers);
            },
            error: function (result, status, xhr) {
                 $('#spinner').hide();
            }
        });
    }

    function bindGrid(grid, src, data) {
        var result = '{"' + grid + '":' + JSON.stringify(data) + "}";
        var source = $('#' + src).html();
        var template = Handlebars.compile(source);
        var html = template(JSON.parse(result));
        $("#" + grid).html(html);
        if (data.length < 1) {
            $("#noRecordsFound").removeAttr('Style', 'display');
        }
        else {
            $("#noRecordsFound").css('display', 'none');
        }
    }

});