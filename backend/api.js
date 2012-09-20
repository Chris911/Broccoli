// API Access Point
var express = require('express');
var apiServer = express();
var retreiver = require('./modules/retreiver');

// Env variable declaration
var apiServerVar = {
    "name":"broccoli-api",
    "port":8089,
    "version":"0.0.01a"
}

// Ignore requests for favicon.ico
apiServer.use(express.favicon());

apiServer.get('/API/visits/:domain', function(request, response){
	var domain = request.params.domain;

	 if((typeof domain != 'undefined')) {
		retreiver.visits(domain, function(object){
			response.send(object);
		});
	}
});

apiServer.get('/get', function(req, res){
	res.send('Broccoli API - /get');
});

apiServer.post('/post', function(req, res){
	res.send('Broccoli API - /post');
});

apiServer.listen(apiServerVar.port);
console.log('Server running : ' + apiServerVar.port);