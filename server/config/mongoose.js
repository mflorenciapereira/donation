var config = require('./config')
mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);	
	
	require('../models/point.server.model');
	require('../models/user.server.model');
	
	return db;
};