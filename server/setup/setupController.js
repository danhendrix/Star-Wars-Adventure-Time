var Q = require('q');
var gettyKeys = require('./gettyKeys.js');
var request = require('request');
var api = require("gettyimages-api");
var creds = { apiKey: gettyKeys.apiKey, apiSecret: gettyKeys.apiSecret, username: gettyKeys.username, password: gettyKeys.password };
var client = new api (creds);
// var findUser = Q.nbind(User.findOne, User);

var possiblePeople = [1,2,3,4,5,8,10,11,13,14];

var getCharacterPicture = function(character,callback) {
	client.search().images().withPage(1).withPageSize(1).withPhrase(character)
	    .execute(function(err, response) {
	        if (err) throw err
	        callback(JSON.stringify(response.images[0]));
	    });
}

var getCharacter = function(req, res, next) {
	var randomName = Math.floor(Math.random()*possiblePeople.length);

	request('http://swapi.co/api/people/' + possiblePeople[randomName] + '/', function(err, response, body) {
		if (!err & response.statusCode === 200) {
			console.log('!!!!!!!!!!!!!!1 ', JSON.parse(response.body).name)

			getCharacterPicture(JSON.parse(response.body).name,function(resp) {
				imageUrl = JSON.parse(resp).display_sizes[0].uri;
				res.send([response.body, JSON.stringify(imageUrl)]);
			})
			// res.send([response.body, imageUrl]);			
		}
		else {
			res.send(err)
		}
	});
}

module.exports = {
	getCharacter: getCharacter
}


