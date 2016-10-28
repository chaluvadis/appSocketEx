var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var util = require('./util');

//to rename the file upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    var list = util.getDataFromJSON(req);
    cb(null, (list.length + 1) + '.' + 'jpg');
  }
});

router.get('/', function (req, res) {
  var list = util.getDataFromJSON(req);
  res.render('admin', {
    movies: list
  });
});

router.post('/', multer({
  storage: storage
}).single('logo'), (req, res) => {
  var list = util.getDataFromJSON(req);
  var data = {
    id: list.length + 1,
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    logo: '/images/' + (list.length + 1) + '.jpg',
  }

  list.push(data);

  fs.writeFileSync('list.json', JSON.stringify(list));
  data.logo = req.protocol + "://" + req.headers.host + data.logo;
  //emit some events to the client
  req.app.io.emit('movie', data);

  req.app.io.on('movie-updated', (data) => {
    console.log('movie updated in client :', data);
  })
  res.send('movie uploaded successfully');
});

module.exports = router;
