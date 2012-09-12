var http = require('http');
var url = require('url');
var Db = require('/home/pag/public_html/node_modules/mongodb').Db;
var Server = require('/home/pag/public_html/node_modules/mongodb').Server;

var $count = 0;

function myGetTime() {
        return new Date(hours, minutes, seconds, milliseconds);
}

var server = http.createServer(function (request, response) {
	// URL formatting and setting DB context
	// --Is there a more efficent method for formatting?
	domainRepPeriod = request.headers.origin.replace(/\./g,'-');
	domainFormatted = domainRepPeriod.replace('http://','');
	db = new Db(domainFormatted, new Server('localhost', 27017, {}), {});

	// Variable
	ip_address = request.connection.remoteAddress;
	domain = request.connection.serverName;
    pathname = url.parse(request.url).query;
	
	// Open DB + Insertion
    db.open(function() {
		db.collection('visits', function(err, collection){
            doc={
                "origin"  :     request.headers.origin,
                "ip"  :         ip_address,
                "url-request" : pathname
            };
	
			collection.insert(doc, function(){
				console.log("Data inserted in DB");
			});
        });
    });

	// Response
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("Broccoli v1.0\n");
	
	// Console logging
    console.log(" ", $count, " : URL - ", pathname);
    console.log(" ", $count, ' : Host - ', request.headers.origin);
    console.log(" ", $count, ' : Request - ', myGetTime(),'- ',  ip_address, ' from : ', request.headers.referer );
    console.log("------------");
    $count++;
});

server.listen(8080);

console.log("Server running...");



