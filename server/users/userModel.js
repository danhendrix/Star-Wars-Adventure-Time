var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	character: String,
	ship: {
		type: String,
		default: 'none'
	},
	planet: {
		type: String,
		default: 'none'
	},
	health: {
		type: Number,
		default: 100
	},
	level: {
		type: Number,
		default: 1
	},
	credits: {
		type: Number,
		default: 1000
	}
})

module.exports = mongoose.model('users', userSchema);
