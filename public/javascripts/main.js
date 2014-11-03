/**
 * Created by Ejiro on 11/2/14.
 */

$(document).ready(function () {
    /**
     * Register form submission using jQuery library
     */
    $("#search").submit(function (event) {
        var data = form_submit($(this));
        event.preventDefault();

        //parses the input data in the form
        var query = {}
        for(var i = 0; i < data.length; i++){
            var key = data[i].name;
            var value = data[i].value;
            if(value && key == "numCommits")
                query[key] = parseInt(value);
            else if(value)
                query[key] = value;
        }
        //get a query string
        var queryString = JSON.stringify(query);
        //alert(data);

        //redirect using the query string as param
        window.location.href = window.location.pathname+'?terms='+queryString
    });

    /**
     * Helper function that returns the form params as JSON object
     * @param form
     * @returns {*}
     */
    function form_submit(form) {
        var data = JSON.stringify(form.serializeArray());
        return JSON.parse(data);
    }
});