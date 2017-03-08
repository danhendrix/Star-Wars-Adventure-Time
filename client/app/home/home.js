angular.module('mvp.home', [])

.controller('HomeController', function($scope, $location, Home, Setup) {
	$scope.character = Home.initialize()
	$scope.battle = false;
	$scope.charPic = '';

	$scope.goFight = function() {
		$scope.battle=true;
		$location.path('/battle');

		// $location.path('/battle')
	};

	$scope.sendPlayer = function() {
		return $scope.character;
	}

});