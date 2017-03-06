var User = require('./userModel.js');
var Q = require('q');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
	signin: function(req, res, next) {
		var username = req.body.username;
		console.log('!!!!!!!!!!!!!!!!!!', username)

		findUser({username: username})
			.then(user => {
				if (!user) {
					throw(new Error('User does not exist!'));
					res.redirect('/signin')
				}
				else {
					console.log('got here!')
					res.redirect('/home')
				}
			})
	},

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