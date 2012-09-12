var http = require('http');
var url = require('url');
var $count = 0;

function myGetTime() {
    var dd = new Date();
    var hh = dd.getHours();
    var mm = dd.getMinutes();
    var ss = dd.getSeconds();
	return dd;
}

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Broccoli v1.0\n");
  ip_address = request.connection.remoteAddress;
  domain = request.connection.serverName;
	// var pathname = url.parse(request.url);
	var pathname = url.parse(request.url).query;
	console.log(" ", $count, " : URL - ", pathname);
	console.log(" ", $count, ' : Host - ', request.headers.origin);
	console.log(" ", $count, ' : Request - ', myGetTime().getHours(),':', myGetTime().getMinutes(),':', myGetTime().getSeconds(),'- ',  ip_address, ' from : ', request.headers.referer );
	console.log("------------");
$count++;

});

server.listen(8080);

console.log("Server running...");
