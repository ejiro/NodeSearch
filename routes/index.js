/**
 * Created by Ejiro on 11/1/14.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Node/Express/ElasticSearch',
    desc: 'Now what...instructions coming soon'});
});

module.exports = router;
