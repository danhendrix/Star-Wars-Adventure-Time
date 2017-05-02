var express = require('express');
var mongoose = require('mongoose');

var app = express();
require('dotenv').config();

//local
// mongoose.connect('mongodb://localhost/mvp');
console.log('mlab? ', process.env.MLAB)
mongoose.connect(process.env.MLAB);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);


app.listen(8000, function() {
	console.log('listening on port 8000');
});

module.exports = app;

