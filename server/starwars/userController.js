var User = require('./userModel.js');
var Q = require('q');

var findUser = Q.nBind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
	signin: function(req, res, next) {
		var username = req.username;

		findUser({username})
			.then(user => {
				if (!user) {
					next(new Error('User does not exist!'));
				}
				else {
					return user
				}
			})
	}

	signup: function(req, res, next) {
		var username = req.body.username;

		findUser({username: username})
			.then(function(user) {
				if(user) {
					next(new Error('user already exists'));
				}
				else {
					res.send(200);
					return createUser({username: username});
				};
			})
	}
}