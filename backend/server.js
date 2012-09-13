var http = require('http');
var url = require('url');
var factory = require('./modules/factory');
var backstore = require('./modules/backstore');

// Env variable declaration
var serverVar = {
    "name":"broccoli-server",
    "port":"8081"
}

// Webserver & Callback
var server = http.createServer(function (request, response) {
    console.log('Server: request handling... -------------');
    
    var reqObj = {
        "name":"RequestName",
        "clientIp":request.connection.remoteAddress,
        "domain":request.headers.origin,
        "urlRequest":url.parse(request.url).query,
        "valid":"false"
    };
    
    factory.checkValidity(reqObj, function(request){
        console.log("Server: prop.valid: " + reqObj.valid + ", IP :" + reqObj.urlRequest);
        backstore.insert(request, function(){
            console.log("Server : Stored in backstore");
        });
    });
      
    response.writeHead(200, {
        "Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*"
	});
    response.end("Broccoli pre-alpha, " + serverVar.port);
    
    console.log('Server: end of handling...');
}).listen(serverVar.port);

console.log("Server running %s:%d", serverVar.name, serverVar.port);
