angular.module('mvp', 
	['mvp.services', 'mvp.auth', 'mvp.setup', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider.when('/signin', {
		templateUrl: 'app/auth/signin.html',
		controller: 'AuthController'
	})
	.when('/signup', {
		templateUrl: 'app/auth/signup.html',
		controller: 'AuthController'
	})
	.when('/setup', {
		templateUrl: 'app/setup/setup.html',
		controller: 'SetupController'
	})
})
