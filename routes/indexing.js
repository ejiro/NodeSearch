/**
 * Created by Ejiro on 11/2/14.
 */

var express = require('express');
var elasticsearch = require('elasticsearch');
var argv = require('optimist').argv;

var client = new elasticsearch.Client({
    host: argv.fe_ip+':9200',
    log: 'trace'
});

var router = express.Router();

/* GET indexing page. */
router.get('/', function(req, res) {
    var qryObj = req.query.terms;
    indexDoc(qryObj, req, res);
});

/**
 * Extends Object to have a simplified size function
 * that returns the number of items in the obj
 * @param obj
 * @returns {number}  Number of items in the object
 */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * Extends String to have simplified hashCode for the giving string
 * @returns {number}
 */
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/**
 * The indexing function that interfaces with elastic search indexing api
 * @param qryObj the JSON doc that needs to be index
 * @param req Node Server Request object
 * @param res Node Server Response object
 */
function indexDoc(qryObj, req, res) {
    //generated the hash for the indexed doc
    if(qryObj && tryParseJSON(qryObj)) {
        var hash = qryObj.hashCode();

        //using elastic client, index the doc
        client.bulk({
            body: [
                // action description
                {index: {_index: 'tutorial', _type: 'trends', _id: hash}},
                // the document to index
                qryObj
            ]
        }, function (error, data) {
            if (error) {
                var msg = 'elasticsearch cluster is down!: code=' + err.message;
                console.trace(msg);
                res.render('indexing', {title: "Error", desc: msg});
            } else {
                console.log('All is well');
                var results = JSON.stringify(JSON.parse(qryObj), null, 4);
                res.render('indexing', {title: "Indexed Item", results: results});
            }
        });
    }else{
        res.render('indexing', {title: "Error", desc: "Undefined query string"});
    }
}

/**
 * Try parsing the input json string into JSON, returns false is not a valid json string
 * @param jsonString
 * @returns {*}
 */
function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object",
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
}

module.exports = router;