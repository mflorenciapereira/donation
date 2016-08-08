var mongoose = require('mongoose'),
Schema = mongoose.Schema;
PointSchema = require('./point.server.model.js');

mongoose.Promise = Promise;

var UserSchema = new Schema({
	userId: String,
	points: [{type: Schema.Types.ObjectId, ref: 'Point'}]
});

mongoose.model('User', UserSchema);