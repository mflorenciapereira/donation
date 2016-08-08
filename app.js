process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./server/config/express');
var mongoose = require('./server/config/mongoose');

var db = mongoose();
var app = express();

var sockeio = require('./server/config/socketio')(app);
sockeio.listen(8000);

module.exports = app;


