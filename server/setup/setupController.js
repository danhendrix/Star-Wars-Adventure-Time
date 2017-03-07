var Q = require('q');
var gettyKeys = require('./gettyKeys.js');
var request = require('request');
var api = require("gettyimages-api");
var creds = { apiKey: gettyKeys.apiKey, apiSecret: gettyKeys.apiSecret, username: gettyKeys.username, password: gettyKeys.password };
var client = new api (creds);
// var findUser = Q.nbind(User.findOne, User);

var possiblePeople = [1,2,3,4,5,10,11,13,14];

var getPicture = function(character,callback) {
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

			getPicture(JSON.parse(response.body).name,function(resp) {
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

var possiblePlanets = [1,2];

var getPlanet = function(req, res, next) {
	var randomPlanet = Math.floor(Math.random()*possiblePlanets.length);
	request('http://swapi.co/api/planets/' + possiblePlanets[randomPlanet] + '/', function(err, response, body) {
		if (!err & response.statusCode === 200) {
			var planet = JSON.parse(response.body).name;
			console.log('!!!!!!!!!!!!!!1 ', planet)

			getPicture(JSON.parse(response.body).name,function(resp) {
				imageUrl = JSON.parse(resp).display_sizes[0].uri;
				res.send([response.body, JSON.stringify(imageUrl)]);
			})		
		}
		else {
			res.send(err)
		}		
	})
}

	var ships = [{
		name: "Death Star",
		shipPic: 'http://vignette2.wikia.nocookie.net/starwars/images/9/9d/DSI_hdapproach.png/revision/latest?cb=20130221005853'
	},
	{
		name: 'CR 90',
		shipPic: 'http://img15.deviantart.net/354e/i/2010/280/9/1/corellian_cr90___perspective_by_dlamont-d308syj.jpg'
	},
	{
		name: 'Star Destroyer',
		shipPic: 'data:image/jpeg;base64,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'
	},
	{
		name: "Millennium Falcon",
		shipPic: 'http://www.gunjap.net/site/wp-content/uploads/2015/11/DSC_0626_zps6x61oybs.jpgoriginal.jpg'
	},
	{
		name: "x-wing",
		shipPic: 'http://cdn2us.denofgeek.com/sites/denofgeekus/files/big_thumb_cd04cc40bd2e7060c7a2b417b1743b74.jpg'
	},
	{
		name: 'TIE Fighter',
		shipPic: 'http://tf3dm.com/imgd/l15332-tie-fighter-94029.jpg'
	}]

	var getShip = function(req, res, next) {
	var randomShip = ships[Math.floor(Math.random()*ships.length)];
	console.log(randomShip)
	res.send(randomShip);
	}

module.exports = {
	getCharacter: getCharacter,
	getPlanet: getPlanet,
	getShip: getShip
}


