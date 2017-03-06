angular.module('mvp.auth', [])

	.controller('AuthController', function($scope, $location, Auth) {
		$scope.user = {};

		$scope.signin = function() {
			Auth.signin($scope.user)
				.then(function(user) {
					$location.path('/setup');
				}).catch(function(e) {
					console.error(e);
				})
		};

		$scope.signup = function() {
			Auth.signup($scope.user)
				.then(function(user) {
					$location.path('/setup');
				}).catch(function(e) {
					console.error(e);
				});
		};

	})