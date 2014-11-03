/**
 * Created by Ejiro on 11/2/14.
 */

var express = require('express');
var elasticsearch = require('elasticsearch');


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

var router = express.Router();

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


/* GET indexing page. */
router.get('/', function(req, res) {
    var qryObj = req.query.terms;
    indexDoc(qryObj, req, res);
});

function indexDoc(qryObj, req, res) {
    var hash = qryObj.hashCode();
    client.bulk({
        body: [
            // action description
            {index: {_index: 'tutorial', _type: 'trends', _id:hash}},
            // the document to index
            qryObj
        ]
    }, function (error, data) {
        if (error) {
            var msg = 'elasticsearch cluster is down!: code='+err.message;
            console.trace(msg);
            res.render('indexing', {title:"Error", desc: msg});
        } else {
            console.log('All is well');
            var results = JSON.stringify(JSON.parse(qryObj), null, 4);
            res.render('indexing', {title:"Indexed Item", results: results});
        }
    });
}

module.exports = router;