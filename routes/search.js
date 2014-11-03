/**
 * Created by Ejiro on 11/1/14.
 */

var express = require('express');
var elasticsearch = require('elasticsearch');


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var router = express.Router();

/* GET search page. */
router.get('/', function(req, res) {
    var termToSearch = req.query.terms;
    pingSearch();
    search(termToSearch, req, res);
});


function pingSearch() {
    client.ping({
        // ping usually has a 100ms timeout
        requestTimeout: 1000,

        // undocumented params are appended to the query string
        hello: "elasticsearch!"
    }, function (error, data) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
}

function search(terms, req, res) {
    var queryObj =  JSON.parse(terms);
    // Get the size of an object
    var size = Object.size(queryObj);
    if(size > 0) {
        var queryString = null;
        for( var key in queryObj){
            var value = queryObj[key]
            if (queryString) {
                queryString = queryString + " AND (" + key + ":" + value + ")"
            }else {
                queryString = "(" + key + ":" + value + ")"
            }
        }
        client.search({
            index: 'tutorial',
            type: 'trends',
            body: {
                query: {
                    //query_string : { query : terms}
                    query_string: { query: queryString }
                    //match: {message: terms}
                    //match_all:{}
                    //match: queryObj
                }
            }
        }).then(function (body) {
            var hits = body.hits.hits;
            var out = [];
            for (var i = 0; i < hits.length; i++) {
                out[i] = hits[i]._source
            }
            var results = JSON.stringify(out, null, 4);
            res.render('search', {title: 'Advance Search', query: terms, results: results});
        }, function (error) {
            console.trace(error.message);
        });
    }else{
        //do nothing??
        var results = [];
        res.render('search', {title: 'Advance Search', query: terms, results: results});
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

module.exports = router;