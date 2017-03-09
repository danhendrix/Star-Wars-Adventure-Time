angular.module('mvp.services', [])

.factory('Auth', function($http, $location, Setup) {
	var signin = function(user) {
		console.log('+_+_+_+_+_+_+_+_ ', user)
		return $http({
			method: 'POST',
			url: '/api/users/signin',
			data: JSON.stringify({username: user}),
			'content-type': 'application/json'
		}).then(function(resp) {
			return resp.data;
		}).catch(function(e) {
			console.error(e)
		})
	};

	var signup = function(user) {
		return $http({
			method: 'POST',
			url: '/api/users/signup',
			data: JSON.stringify({username: user}),
			'content-type': 'application/json'
		}).then(function(resp) {
			console.log('heres the server response ', resp)
			return resp.data;
		});
	};

	return {
		signin: signin,
		signup: signup
	};
})

.factory('Setup', function($http, $location) {

	var user = null;

	var initialize = function(username, callback) {
		user = username;
		callback(user);
	}

	var getUser = function() {
		return user;
	}	

	var getCharacter = function() {
		console.log('getCharacter!!!!!!!!')
		return $http({
			method: 'GET',
			url: '/api/setup/setupCharacter'
		}).then(function(resp) {
			return resp.data
		}).catch(function(err) {
			console.error(err);
		})
	}

	var getPlanet = function() {
		return $http({
			method: 'GET',
			url: '/api/setup/setupPlanet'
		}).then(function(resp) {
			console.log('planet data', resp)
			return resp.data
		}).catch(function(err) {
			console.log(err)
		})
	}

var getShip = function() {
	return $http({
		method: 'GET',
		url: '/api/setup/setupShip'
	}).then(function(resp) {
		console.log('ship data', resp)
		return resp.data
	}).catch(function(err) {
		console.error(err);
	})
}

var confirm = function(user) {
	console.log('trying to confirm user ', user)
	return $http({
		method: 'POST',
		url: 'api/setup/saveCharacter',
		data: JSON.stringify(user),
		'content-type': 'application/json'
	}).then(function(resp) {
		console.log('confirm response ', user)
			return user;
	}).catch(function(err) {
		console.error(err);
	})
}


	return {
		getCharacter: getCharacter,
		getPlanet: getPlanet,
		getShip: getShip,
		confirm: confirm,
		initialize: initialize,
		getUser: getUser
	}
})

.factory('Home', function(Setup, $location) {
	var character = null;
	var saveCharacter = function(newCharacter) {
		console.log('character saving in Home', newCharacter)
		character = newCharacter;
	};

	var initialize = function() {
		console.log('init getting called!', character)
		return character;
	}

	return {
		saveCharacter: saveCharacter,
		initialize: initialize
	}
})

.factory('Battle', function(Home, $location) {
	var player = Home.initialize;
	console.log('player is ', player)

	var updatePlayer = function(currentPlayer) {
		console.log('currentplayer ', currentPlayer)
		player = currentPlayer;
	}

	var getDamage = function() {
		console.log('trying to get damage heres the player ', player)
		var damage = Math.floor(Math.random() * player.level * 20);
		return damage;
	}

	var battle1 = function() {
		return 'You fly aimlessly around for a while, not sure where to go.\n\nYou have the sneaking suspicion you left the oven on...\n\n'
		+ 'When suddenly you\'re jumped by some unmarked craft.\n\n';

	}

	var battle2 = function() {
		return 'You\'re so ready to get going. Sometimes you get sick of talking about the empire and the force and stuff,\nand seriously want to just go shoot something.\n\n'
		+ 'You\'re cruising through sector 12 when you spot a very dangrous looking ship.\n\n'
	}

	var battle3 = function() {
		return 'You\'re a little low on fuel but you decide to take one more run through enemy territory.\n\n'
		+ 'You\'re not particularly smart.\n\n'
		+ 'You\'re about to call it a night when you suddently see a shot fly by your window coming from right behind you.\n\nIt looks like someone\'s on your tail\n\n'
	}

	var battle4 = function() {
		return 'It must be your lucky day. You spot a transport ship unescorted.\n\nIt\'s easy prey but it makes you uneasy. It could be a trap.\n\n';
	}

	var battle5 = function() {
		return 'It\'s only been seconds since you took off and you\'ve got bogeys all around you.\n\nYou could try to land now but that would be pretty embarrassing for everyone.';
	}	

	var battleOpenings = [battle1, battle2, battle3,  battle4, battle5]

	var getBattleOpening = function(){
		var pick = Math.floor(Math.random() * battleOpenings.length);
		return battleOpenings[pick].call(null)
	}

	var bandit = Math.floor(Math.random() * 100);

	var attack = function(currentBogey = bandit) {
		var message = ''
		var chances = [true,true,true,false];
		var success = chances[Math.floor(Math.random() * chances.length)];
		if (success) {
			var damage = getDamage();
			attackMessage = 'You make some skillful moves and nail the bandit for ' + damage + ' damage.'
			bandit -= damage;
			if (bandit <= 0) {
				message = 'Wow, I\m pretty sure he just blew up.'
				return {
		 		'player': player, 
		 		'attackMessage': attackMessage, 
		 		'message': message, 
		 		'bandit': bandit, 
		 		'fight': false
		 		}
		 	}
			else {
				return {
		 		'player': player, 
		 		'attackMessage': attackMessage, 
		 		'message': message, 
		 		'bandit': bandit, 
		 		'fight': true
		 		}
		 	}
		}
		 else {
		 	attackMessage = 'I guess you left the force at home. That was some seriously bad aim.'
		 	return {
		 		'player': player, 
		 		'attackMessage': attackMessage, 
		 		'message': message, 
		 		'bandit': bandit, 
		 		'fight': true
		 		}
		 	}
	}

	var response = function() {
		var fight = true;
		var damage = Math.floor(Math.random() * player.level * 20);
		player.health -= damage;
		message = 'Not so fast young Jedi. He got you for ' + damage + '. Ouch';
		if (player.health <= 0) {
			console.log(player.health)
			fight = false;
		}
		return {
			'message': message,
			'playerHealth': player.health,
			'damage': damage,
			'fight': fight
		}
	}

	return {
		updatePlayer: updatePlayer,
		getBattleOpening: getBattleOpening,
		attack: attack,
		response: response
	}
})








