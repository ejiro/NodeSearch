/**
 * Created by Ejiro on 11/2/14.
 */

$(document).ready(function () {
    $("#search").submit(function (event) {
        var data = form_submit($(this));
        event.preventDefault();
        var query = {}
        for(var i = 0; i < data.length; i++){
            var key = data[i].name;
            var value = data[i].value;
            if(value && key == "numCommits")
                query[key] = parseInt(value);
            else if(value)
                query[key] = value;
        }
        var queryString = JSON.stringify(query);
        //alert(data);
        window.location.href = window.location.pathname+'?terms='+queryString
    });

    function form_submit(form) {
        var data = JSON.stringify(form.serializeArray());
        return JSON.parse(data);
    }
});