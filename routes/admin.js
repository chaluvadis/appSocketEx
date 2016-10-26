var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var list = JSON.parse(fs.readFileSync('./list.json'));

//to rename the file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, (list.length + 1) + '.' + 'jpg');
    }
});

router.get('/', function (req, res) {
    res.render('admin', { movies: list });
});

router.post('/', multer({ storage : storage }).single('logo'), function (req, res) {
    list.push({
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        logo: '/images/' + (list.length + 1) + '.jpg'
    });
    fs.writeFileSync('list.json', JSON.stringify(list));
    res.send('movie uploaded successfully');
});

module.exports = router;

