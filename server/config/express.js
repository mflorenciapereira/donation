var express = require('express');
var path = require('path');
var logger = require('morgan');

module.exports = function() {
	
	var app = express();
	
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '/../../public')));
	app.use(express.static('node_modules'));	
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	return app;
};