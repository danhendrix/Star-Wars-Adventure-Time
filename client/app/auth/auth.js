angular.module('mvp.auth', [])

	.controller('AuthController', function($scope, $location, Auth) {
		$scope.username = '';

		$scope.signin = function() {
			Auth.signin($scope.username)
				.then(function(user) {
					$location.path('/setup');
				}).catch(function(e) {
					console.log('something happened')
					$location.path('/signin')
				})
		};

		$scope.signup = function() {
			Auth.signup($scope.username)
				.then(function(user) {
					$location.path('/setup');
				}).catch(function(e) {
					console.error(e);
				});
		};

	})