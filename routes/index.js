var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('./util');

router.get('/', function(req, res){
    var list = util.getDataFromJSON(req);
    res.render('index', {movies : list});
});

module.exports = router;
