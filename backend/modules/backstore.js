var url = require('url');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db;

var dbServerVar = {
    "name":"dbname",
    "port":27017
};

var init = function(request, callback){
    domainParsing = url.parse(request.domain); 
    domainFormatted = domainParsing.hostname.replace(/\./g,'-');
    domainFormatted = domainFormatted.replace(/\//g,'-');
    dbServerVar.name = domainFormatted;
    
    db = new Db(dbServerVar.name, new Server('localhost', dbServerVar.port, {}), {});
    
    console.log("## Backstore: init complete %s, %d", dbServerVar.name, dbServerVar.port);
    callback(request);
};

var insert = function(request,callback){

    db.open(function() {
        db.collection('visits', function(err, collection){
            if(err) {
                //Handle error
                console.log("Exception occured (Backstore.js/insert): \n");
                console.log("Request data: " + request + "\n")
                return;
            }
            collection.insert(request, function(){
                console.log("## Backstore: Data inserted in DB");
            });
        });
    });

};

exports.insert = function(request,callback){
    console.log("## Backstore: insert");
    
    init(request, function(request){
            insert(request, function(request){
            callback(request);
        });
    });
    
    callback();
};