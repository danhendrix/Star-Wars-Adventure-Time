var express = require('express');
var mongoose = require('mongoose');

var app = express();

//mongoose.connect('mongodb://localhost/mvp');

require('./config/middleware.js')(app, express);


app.listen(8000, function() {
	console.log('listening on port 8000');
});

module.exports = app;

