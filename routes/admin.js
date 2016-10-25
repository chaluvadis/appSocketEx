var express = require('express');
var router = express.Router();
var fs = require('fs');
var list = JSON.parse(fs.readFileSync('./list.json'));

router.get('/', function(req, res){
    res.render('admin', {movies : list});
});

router.post('/', function(req, res){
    var data = req.body;
    list.push({
        title: data.title,
        director: data.director,
        genre: data.genre
    });
    res.render('admin', {movies: list});
});

module.exports = router;
