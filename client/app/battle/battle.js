angular.module('mvp.battle', [])

.controller('BattleController', function($scope, $location, Home, Battle) {
	$scope.player = Home.initialize();
	// Battle.updatePlayer($scope.player);
	$scope.battleStart = false;
	$scope.battleText = ''
	$scope.choice = 'Should you (A)ttack or (R)un?'
	$scope.bandit = '';

	$scope.startBattle = function() {
		console.log($scope.player)
		Battle.updatePlayer($scope.player);
		$scope.battleStart = true;
		$scope.battleText = Battle.getBattleOpening();
	}

	$scope.attack = function() {
		var results = Battle.attack();
		console.log(results)
		$scope.battleText += '\n' + results.attackMessage;
		if (results.message) {
			$scope.battleText += '\n' + results.message
		}
		$scope.bandit = ' and the bandit has ' + results.bandit;
		if (results.fight) {
			var response = Battle.response();
			console.log('heres the response ', response)
			if (response.fight) {
				console.log('still fighting with ', response)
				$scope.battleText += '\n' + response.message;
			}
			else {
				$scope.battleText += '\n\nYou\'re dead. Should have swerved the other way.'
				setTimeout(function() {
					$location.path('/signin')
				}, 300)
			}

		}
		else {
			$scope.battleText += '\n' + 'You got one. Let\'s go home.'
			setTimeout(function() {
				$location.path('/home')
			}, 300)
		}
	}

	$scope.run = function() {
		console.log('running')
	}



	// $scope.getBattle = function() {
	// 	return 'yo'
	// }




})