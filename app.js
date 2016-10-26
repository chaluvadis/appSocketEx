var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('PORT', process.env.port || 1337);

//var server = http.createServer(app);

var server = app.listen(app.get('PORT'), function(){
    console.log('Server is running at ' + app.get('PORT'));
});

var io = require('socket.io').listen(server);

var index = require('./routes/index');
var admin = require('./routes/admin');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/admin', admin);

//emit some events to the client
io.on('connection', function(socket){
    socket.emit('news', {hello: 'world'});
    socket.on('event from client', function(data){
        console.log('from client :', data);
    })
});
