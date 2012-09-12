var http = require('http');
var url = require('url');
var mongo = require('/home/pag/public_html/node_modules/mongodb'),
        db = new mongo.Db('www-dalbertson-com', new mongo.Server('localhost', 27017, {}), {});
db.open(function() {
	console.log("DBCreate");
});

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

	db.collection('visits', function(err, collection){
                doc={
                        "origin"  :     request.headers.origin,
                        "ip"  :     	ip_address,
                        "url-request" :	pathname
                };

        collection.insert(doc, function(){
        console.log("inserted");
        });
        });

	console.log(" ", $count, " : URL - ", pathname);
	console.log(" ", $count, ' : Host - ', request.headers.origin);
	console.log(" ", $count, ' : Request - ', myGetTime().getHours(),':', myGetTime().getMinutes(),':', myGetTime().getSeconds(),'- ',  ip_address, ' from : ', request.headers.referer );
	console.log("------------");
	$count++;

});

server.listen(8080);

console.log("Server running...");
