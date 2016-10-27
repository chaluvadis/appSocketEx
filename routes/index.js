var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res){
    var list = getDataFromJSON(req);
    res.render('index', {movies : list});
});

function getDataFromJSON(req){
    var list = JSON.parse(fs.readFileSync('./list.json'));
    list.forEach((movie) => {
        movie.logo = req.protocol + "://" + req.headers.host + movie.logo;
    });
    return list;
}

module.exports = router;
