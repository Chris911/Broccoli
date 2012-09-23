// API Access Point
var express = require('express');
var apiServer = express();
var retreiver = require('./modules/retreiver');
var security = require('./modules/security');
var url = require('url');

// Env variable declaration
var apiServerVar = {
    "name":"broccoli-api",
    "port":8090,
    "version":"0.0.01a"
}

// Ignore requests for favicon.ico
apiServer.use(express.favicon());

apiServer.get('/API/:domain', function(request, response){

	var reqObj = {
        "domain":request.params.domain
    };

    console.log(reqObj.domain);
	var domain = request.params.domain;

	security.idCheck(reqObj, function(request, idCheck){
		console.log(idCheck);
		console.log(request.storingHash);
		response.send(idCheck);
	})
});

apiServer.get('/get', function(req, res){
	res.send('Broccoli API - /get');
});

apiServer.post('/post', function(req, res){
	res.send('Broccoli API - /post');
});

apiServer.listen(apiServerVar.port);
console.log('Server running : ' + apiServerVar.port);


