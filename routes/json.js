/**
 * Created by Ejiro on 11/2/14.
 */
var express = require('express');
var options = {
    feed: {
        title: 'feed title',
        description: 'feed description',
        link: 'http://example.org/rss.xml',
        language: 'en'
    },
    posts: [{
        title: 'post1 title',
        description: 'post1 summary',
        canonicalUrl: 'http://example.org/post1',
        pubDate: (new Date()).toGMTString()
    }]
};

var router = express.Router();

/* GET json page. */
router.get('/', function(req, res) {
    res.send(JSON.stringify(options.posts));
});

module.exports = router;
