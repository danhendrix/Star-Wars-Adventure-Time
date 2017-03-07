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
	}
})

module.exports = mongoose.model('users', userSchema);
