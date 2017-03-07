angular.module('mvp.services', [])

.factory('Auth', function($http, $location) {
	var signin = function(user) {
		console.log('+_+_+_+_+_+_+_+_ ', user)
		return $http({
			method: 'POST',
			url: '/api/users/signin',
			data: JSON.stringify({username: user}),
			'content-type': 'application/json'
		}).then(function(resp) {
			return resp.data;
		}).catch(function(e) {
			console.error(e)
		})
	};

	var signup = function(user) {
		return $http({
			method: 'POST',
			url: '/api/users/signup',
			data: JSON.stringify({username: user}),
			'content-type': 'application/json'
		}).then(function(resp) {
			console.log('heres the server response ', resp)
			return resp.data;
		});
	};

	return {
		signin: signin,
		signup: signup
	};
})

.factory('Setup', function($http, $location) {

	var user = null;

	var initialize = function(username, callback) {
		user = username;
		callback(user);
	}

	var getUser = function() {
		return user;
	}

	var getCharacter = function() {
		console.log('getCharacter!!!!!!!!')
		return $http({
			method: 'GET',
			url: '/api/setup/setupCharacter'
		}).then(function(resp) {
			return resp.data
		}).catch(function(err) {
			console.error(err);
		})
	}

	var getPlanet = function() {
		console.log('getPlanet!!!!!!!!')
		return $http({
			method: 'GET',
			url: '/api/setup/setupPlanet'
		}).then(function(resp) {
			return resp.data
		}).catch(function(err) {
			console.error(err);
		})		
	}

var getShip = function() {
	return $http({
		method: 'GET',
		url: '/api/setup/setupShip'
	}).then(function(resp) {
		return resp.data
	}).catch(function(err) {
		console.error(err);
	})
}

var confirm = function(user) {
	return $http({
		method: 'POST',
		url: 'api/setup/saveCharacter',
		data: JSON.stringify(user),
		'content-type': 'application/json'
	}).then(function(resp) {
		$location.path('/home');
	}).catch(function(err) {
		console.error(err);
	})
}


	return {
		getCharacter: getCharacter,
		getPlanet: getPlanet,
		getShip: getShip,
		confirm: confirm,
		initialize: initialize,
		getUser: getUser
	}
})








