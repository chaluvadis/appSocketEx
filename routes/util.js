var fs = require('fs');

var getDataFromJSON = (req) => {
  var list = JSON.parse(fs.readFileSync('./list.json'));
  if (list.length > 0) {
    list.forEach((movie) => {
      movie.logo = req.protocol + "://" + req.headers.host + movie.logo;
    });
    list.sort((a, b) => {
      return parseInt(b.id) - parseInt(a.id);
    });
    return list;
  } else {
    return [];
  }
}

module.exports = {
  getDataFromJSON
}
