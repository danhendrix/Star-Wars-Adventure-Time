var express = require('express');
var mongoose = require('mongoose');

var app = express();
require('dotenv').config();

//local
// mongoose.connect('mongodb://localhost/mvp');

mongoose.connect(process.env.MONGODB_URI);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


app.listen(process.env.PORT || 8000, function() {
	console.log('listening');
});

module.exports = app;

