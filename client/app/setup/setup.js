angular.module('mvp.setup', [])

.controller('SetupController', function($scope, Setup, $location, Auth) {
	$scope.character = {};
	$scope.character.username = Setup.getUser();

	//character
	$scope.weHaveCharacters = false;
	$scope.charPic = '';
	$scope.charPicked = false;

	//planet
	$scope.weHavePlanets = false;
	$scope.planetPicked = false;
	$scope.planetPic = '';

	//ship
	$scope.shipPicked = false;
	$scope.weHaveShips = false;
	$scope.shipPic = '';


	$scope.getCharacter = function() {
		Setup.getCharacter()
		.then(function(character) {
			$scope.character.character = JSON.parse(character[0]).name
			$scope.charPic = JSON.parse(character[1])
			$scope.weHaveCharacters = true;
		}).catch(function(err) {
			console.error(err)
		})
	}

	var backupPlanet = [{
		name: 'Yarvin IV',
		'planetPic': 'https://upload.wikimedia.org/wikipedia/en/6/64/Yavin-4.jpg'
	},
	{
		name: 'Hoth',
		planetPic: 'https://farm6.staticflickr.com/5759/22400114579_f2c754cf6a_b.jpg'
	}]

	$scope.getPlanet = function() {
		console.log('char got clicked')
		Setup.getPlanet()
		.then(function(planet) {
			console.log('!!!!!!!!! ', planet)
			if (planet) {
				$scope.character.planet = JSON.parse(planet[0]).name
				$scope.planetPic = JSON.parse(planet[1]);
				console.log($scope.character.planet)
				$scope.charPicked = true;
				$scope.weHavePlanets = true;
			}
			else {
				var randomPlanet = Math.floor(Math.random() * 2);
				$scope.character.planet = backupPlanet[randomPlanet].name
				$scope.planetPic = backupPlanet[randomPlanet].planetPic
				$scope.weHavePlanets = true;
			}
		})
	}



	$scope.getShip = function() {
		$scope.planetPicked = true;
		Setup.getShip()
		.then(function(ship) {
			console.log('SHIIIIPPPP ', ship)
			$scope.character.ship = ship.name;
			$scope.shipPic = ship.shipPic
			$scope.weHaveShips = true;
		})
	};

	$scope.confirm = function() {
		Setup.confirm($scope.character)
		.catch(function(err) {
			console.error(err);
		})
	}
});



