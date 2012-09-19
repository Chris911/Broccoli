//http://www.bennadel.com/blog/2327-Cross-Origin-Resource-Sharing-CORS-AJAX-Requests-Between-jQuery-And-Node-js.htm

var http = require( "http" );

var server = http.createServer(
    function( request, response ){
    	console.log("JSON" + JSON.parse(request.url));
        var origin = (request.headers.origin || "*");

        if (request.method.toUpperCase() === "OPTIONS"){

            response.writeHead(
                "204",
                "No Content",
                {
                    "access-control-allow-origin": origin,
                    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "access-control-allow-headers": "content-type, accept",
                    "access-control-max-age": 10, // Seconds.
                    "content-length": 0
                }
            );

            return( response.end() );


        }

        var requestBodyBuffer = [];

        request.on(
            "data",
            function( chunk ){

                requestBodyBuffer.push( chunk );

            }
        );

        request.on(
            "end",
            function(){

                // Flatten our body buffer to get the request content.
                var requestBody = requestBodyBuffer.join( "" );

                // Create a response body to echo back the incoming
                // request.
                var responseBody = (
                    "Thank You For The Cross-Domain AJAX Request:\n\n" +
                    "Method: " + request.method + "\n\n" +
                    requestBody
                );
                console.log(request.method);
                console.log(JSON.parse(requestBodyBuffer).temp);
                	//http://www.bennadel.com/blog/2327-Cross-Origin-Resource-Sharing-CORS-AJAX-Requests-Between-jQuery-And-Node-js.htm);
                // Send the headers back. Notice that even though we
                // had our OPTIONS request at the top, we still need
                // echo back the ORIGIN in order for the request to
                // be processed on the client.
                response.writeHead(
                    "200",
                    "OK",
                    {
                        "access-control-allow-origin": origin,
                        "content-type": "text/plain",
                        "content-length": responseBody.length
                    }
                );

                // Close out the response.
                return( response.end( responseBody ) );

            }
        );


    }
);


// Bind the server to port 8080.
server.listen( 8082 );


// Debugging:
console.log( "Node.js listening on port 8080" );