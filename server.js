var express = require('express'),
    path = require('path'),
    http = require('http'),
    io = require('socket.io'),
    photo = require('./routes/photos');
    listitem = require('./routes/listitems');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser())
    app.use(express.static(path.join(__dirname, 'public')));
});
var server = http.createServer(app);
io = io.listen(server);
io.configure(function () {
    io.set('authorization', function (handshakeData, callback) {
        if (handshakeData.xdomain) {
            callback('Cross-domain connections are not allowed');
        } else {
            callback(null, true);
        }
    });
});
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
app.get('/photos', photo.findAll);
app.get('/photos/:id', photo.findById);
app.post('/photos', photo.addItem);
app.put('/photos/:id', photo.updateItem);
app.delete('/photos/:id', photo.deleteItem);

app.get('/listitems', listitem.findAll);
app.post('/listitems', listitem.addItem);
app.put('/listitems/:id', listitem.updateItem);
app.delete('/listitems/:id', listitem.deleteItem);