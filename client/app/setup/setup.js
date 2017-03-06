angular.module('mvp.setup', [])

.controller('SetupController', function($scope, Setup) {
	$scope.character = {};

	$scope.getCharacter = function() {
		Setup.getCharacter()
		.then(function(character) {
			$scope.character = JSON.parse(character[0])
		}).catch(function(err) {
			console.error(err)
		})
	}
})