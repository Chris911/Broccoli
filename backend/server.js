var http = require('http');
var url = require('url');
var factory = require('./modules/factory');

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
    
    reqObj = factory.checkValidity(reqObj);
    console.log("Server: prop.valid: " + reqObj.valid + ", IP :" + reqObj.urlRequest);
    
    response.writeHead(200, {
        "Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*"
	});
    response.end("Broccoli pre-alpha, " + serverVar.port);
    
    console.log('Server: end of handling...');
}).listen(serverVar.port);

console.log("Server running %s:%d", serverVar.name, serverVar.port);
