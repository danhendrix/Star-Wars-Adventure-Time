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
					res.redirect('/#/signin')
				}
				else {
					console.log('got here!')
					res.send(user)
				}
			})
	},

	signup: function(req, res, next) {
		console.log('+++++++++++', req.body)
		var username = req.body.username;

		findUser({username: username})
			.then(function(user) {
				if(user) {
					next(new Error('user already exists'));
				}
				else {
					res.send({username: username});
				};
			})
	},

	confirm: function(req, res, next) {
		createUser(req.body)
		.then(function() {
			res.send('User Addex')
		}).catch(function(err) {
			console.error(err);
		})
	}	
}