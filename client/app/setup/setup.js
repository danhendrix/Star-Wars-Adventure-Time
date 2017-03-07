angular.module('mvp.setup', [])

.controller('SetupController', function($scope, Setup, $location) {
	$scope.character = {};

	//character
	$scope.weHaveCharacters = false;
	$scope.charPic = '';
	$scope.charPicked = false;

	//planet
	$scope.planetPicked = false;
	$scope.shipPicked = false;


	$scope.getCharacter = function() {
		Setup.getCharacter()
		.then(function(character) {
			$scope.character.name = JSON.parse(character[0]).name
			$scope.charPic = JSON.parse(character[1])
			$scope.weHaveCharacters = true;
		}).catch(function(err) {
			console.error(err)
		})
	}

	$scope.selectCharacter = function() {
		console.log('char got clicked')
		Setup.getPlanet()
		.then(function(planet) {
			$scope.character.planet = JSON.parse(planet[0]).name
			$scope.planetPic = JSON.parse(planet[1]);
		})
		$scope.charPicked = true;


	}

	$scope.selectPlanet = function() {
		$scope.planetPicked = true;
	}

	$scope.selectShip = function() {
		$scope.shipPicked = true;
	}
})