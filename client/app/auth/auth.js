angular.module('mvp.auth', [])

	.controller('AuthController', function($scope, $location, Auth, Setup, Home) {
		$scope.username = '';

		$scope.signin = function() {
			Auth.signin($scope.username)
				.then(function(user) {
					console.log('saving user in signin ', user)
					Home.saveCharacter(user);
					$location.path('/home');
				}).catch(function(e) {
					console.log('something happened')
					$location.path('/signin')
				})
		};

		$scope.signup = function() {
			Auth.signup($scope.username)
				.then(function(user) {
					Setup.initialize(user.username, function(user) {
						$location.path('/setup')
					});
				})
		};

	})