var mongoose = require('mongoose');

Schema = mongoose.Schema;
mongoose.Promise = Promise;

var PointSchema = new Schema({	
	firstName: {
		type: String,
		required: 'First name is required'
	},
	lastName: {
		type: String,
		required: 'Last name is required'
	},
	address: {
		type: String,
		required: 'Address is required'
	},
	phone : {
		type: String,
		required: 'Phone is required',
		match: [/^00[0-9]{12}|^\+[0-9]{12}$/, 'Invalid phone']
	},
	email: {
		type: String,
		required: 'Email is required',
		match: [/.+\@.+\..+/, 'Invalid email']
	},
	bloodGroup: {
		type: String,
		required: 'Blood group is required'
	},
	ip: {
		type: String,
		required: 'IP is required'
	},
	longitude: {
		type: Number,
		required: 'Longitude is required'
	},
	latitude: {
		type: Number,
		required: 'Latitude is required'
	}
});
mongoose.model('Point', PointSchema);