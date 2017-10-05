// Require our dependencies
var express      = require('express'),
    http         = require('http');

var app = express();
var port = process.env.PORT || 8080;

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
 	console.log('Express server listening on port ' + port);
});