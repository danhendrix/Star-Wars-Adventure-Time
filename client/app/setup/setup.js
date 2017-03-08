angular.module('mvp.setup', [])

.controller('SetupController', function($scope, Setup, $location, Auth, Home) {
	$scope.character = {level: 1, credits: 1000, health: 100};
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
		Setup.getPlanet()
		.then(function(planet) {
			if (planet) {
				$scope.character.planet = planet.name;
				$scope.planetPic = planet.planetPic
				$scope.weHavePlanets = true;
			} else {
				console.log('try again')
			}
		})
	};



	$scope.getShip = function() {
		$scope.planetPicked = true;
		Setup.getShip()
		.then(function(ship) {
			if (ship) {
				console.log('SHIIIIPPPP ', ship)
				$scope.character.ship = ship.name;
				$scope.shipPic = ship.shipPic
				$scope.weHaveShips = true;
			} else {
				console.log('try again')
			}
		})
	};

	$scope.confirm = function() {
		Setup.confirm($scope.character)
		.then(function(user) {
			Home.saveCharacter(user)
			$location.path('/home')
		})
		.catch(function(err) {
			console.error(err);
		});
	}
});



