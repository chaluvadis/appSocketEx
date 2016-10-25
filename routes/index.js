var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res){
    var list = JSON.parse(fs.readFileSync('./list.json'));
    res.render('index', {movies : list});
});

module.exports = router;
