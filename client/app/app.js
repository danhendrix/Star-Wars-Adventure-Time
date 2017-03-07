angular.module('mvp', 
	['mvp.services', 'mvp.auth', 'mvp.setup', 'mvp.home', 'angularTypewrite', 'mvp.battle', 'ngRoute'])
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
	.when('/home', {
		templateUrl: 'app/home/home.html',
		controller: 'HomeController'
	})
	.when('/battle', {
		templateUrl: 'app/battle/battle.html',
		controller: 'BattleController'
	})
	.otherwise({
		redirectTo: '/signin'
	});
})
