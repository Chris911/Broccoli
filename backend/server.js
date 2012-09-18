var http = require('http');
var url = require('url');
var moment = require('moment');
var factory = require('./modules/factory');
var backstore = require('./modules/backstore');
var uaParser = require('express-useragent');

// Env variable declaration
var serverVar = {
    "name":"broccoli-server",
    "port":"8081",
    "version":"0.0.01a"
}

// Webserver & Callback
var server = http.createServer(function (request, response) {
    console.log('---------------------------------------');
    console.log('# Server: request handling...');
    
    // - temp - loging for bug : #5
    console.log(request.headers);

    // Needed otherwise url.parse in reqObj will cause exception if undefined
    if (typeof request.headers.origin == 'undefined') {
        request.headers.origin = "null"
    }

    var parsedUA = uaParser.parse(request.headers['user-agent']);

    var reqObj = {
        "name":"RequestName",
        "valid":"false",
        "clientIp":request.connection.remoteAddress,
        "domain":url.parse(request.headers.origin).hostname,
        "urlRequest":url.parse(request.url).query,
        "userAgent":request.headers['user-agent'],
        "OS":parsedUA.OS,
        "browser":parsedUA.Browser,
        "browserVer":parsedUA.Version,
        "isMobile":parsedUA.isMobile,
        "timestamp":moment().format()
    };
    console.log(reqObj);


    if(typeof reqObj.domain != 'undefined'){
        // If the domain of the request is empty, no visit will be logged (unknown site)
        factory.checkValidity(reqObj, function(request){
            console.log("# Server: prop.valid: " + reqObj.valid + ", IP :" + reqObj.urlRequest);
            backstore.insert(request, function(){
                console.log("# Server : Stored in backstore");
            });
        });
    }
      
    response.writeHead(200, {
        "Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*"
	});
    response.end("Broccoli pre-alpha, " + serverVar.port);
    
    console.log('# Server: end of handling...');
}).listen(serverVar.port);

console.log("# Server running %s:%d", serverVar.name, serverVar.port);
