var starwarsController = require('../starwars/starwarsController.js');
var usersController = require('../users/usersController.js');
var helpers = require('./helpers.js');

module.exports = function(app, express) {
	app.post('/signin', userController.signin)


}