var url = require('url');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db;

var dbServerVar = {
    "name":"dbname",
    "port":27017
};

var init = function(request, callback){
    domainParsing = request.domain; 
    domainFormatted = domainParsing.replace(/\./g,'-');
    domainFormatted = domainFormatted.replace(/\//g,'-');
    dbServerVar.name = domainFormatted;

    db = new Db(dbServerVar.name, new Server('localhost', dbServerVar.port, {auto_reconnect: true, poolSize: 2}), {});
    
    console.log("## Backstore: init complete %s, %d", dbServerVar.name, dbServerVar.port);
    callback(request);
};

var insert = function(request,callback){

    db.open(function() {
        db.collection('visits', function(err, collection){
            if(err) {
                //Handle error
                console.log("Exception occured (Backstore.js/insert): \n");
                console.log("Mongo err : " + err);
                callback(request);
            }
            collection.insert(request, function(){
                console.log("## Backstore: Data inserted in DB");
                db.close();
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