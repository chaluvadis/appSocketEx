var express = require('express');
var router = express.Router();
var fs = require('fs');
var list = JSON.parse(fs.readFileSync('./list.json'));

router.get('/', function(req, res){
    res.render('admin', {movies : list});
});

router.post('/', function(req, res){
    var data = req.body;
    
});

module.exports = router;
