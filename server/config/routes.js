// var starwarsController = require('../starwars/starwarsController.js');
var userController = require('../users/userController.js');
var setupController = require('../setup/setupController.js');
var helpers = require('./helpers.js');

module.exports = function(app, express) {
	// app.post('/api/users/signin', userController.signin)
	app.post('/api/users/signin', function() {
		console.log('hi')
	})

	app.post('/api/users/signup', userController.signup)

	app.get('/api/setup/setupCharacter', setupController.getCharacter);
	// app.post('/api/setup/setupController', setupController.selectCharacter);

	// app.get('api/setup/setupPlanet', setupController.getPlanet);
	// app.post('api/setup/setupPlanet', setupController.selectPlanet);

	// app.get('api/setup/setupShip', setupController.getShip);
	// app.post('api/setup/setupShip', setupController.selectShip);




}