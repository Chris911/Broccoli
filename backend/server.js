var http = require('http');
var url = require('url');
var moment = require('moment');
var crypto = require('crypto');
var uaParser = require('express-useragent');
var factory = require('./modules/factory');
var backstore = require('./modules/backstore');
var logger = require('./modules/logger');
var security = require('./modules/security');

// Env variable declaration
var serverVar = {
    "name":"broccoli-server",
    "port":8081,
    "version":"0.0.01a"
}

// Will need to be implemented for _DEBUG flag
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

// Webserver & Callback
var server = http.createServer(function (request, response) {
    // This hash is used to follow the request on the server
    var requestHash = crypto.createHash('md5').update(JSON.stringify(request.headers)).digest("hex");

    // Needed otherwise url.parse in reqObj will cause exception if undefined
    if (typeof request.headers.origin == 'undefined') {
        request.headers.origin = "null"
    }

    var parsedUA = uaParser.parse(request.headers['user-agent']);

    var reqObj = {
        "hash":requestHash,
        "valid":false,
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
    
    logger.logRequest('info', "Event: New Request (" + requestHash + ")", reqObj);

    if(typeof reqObj.domain != 'undefined') {
        // If the domain of the request is empty, no visit will be logged (unknown site)
        //security.idCheck(reqObj, function(reqObj, idCheck){
            //if(idCheck){
                factory.checkValidity(reqObj, function(request) {
                    backstore.insert(request);
                //});
            //}
        })
    }
      
    response.writeHead(200, {
        "Content-Type": "text/plain",
		"Access-Control-Allow-Origin": "*"
	});    
    response.end("Broccoli pre-alpha, " + serverVar.port);

}).listen(serverVar.port);

logger.log('info', "Server running on " + serverVar.name + ":" + serverVar.port);