var url = require('url');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var assert = require('assert');
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
    
    console.log("Factory: init complete %s, %d", dbServerVar.name, dbServerVar.port);
    callback(request);
};

var timeValidity = function (request, callback){
    db.open(function(err,db){
        db.collection('visits', function(err,collection){
            collection.find().sort([['_id', -1]]).nextObject(function(err, item) {
                assert.equal(null, err);
                console.log("FACTORY CHECK : %s with %s", request.urlRequest, item.urlRequest);
                if(item.urlRequest == request.urlRequest)
                    console.log("Factory: the last request was for the same page, request not valid for %s", request.urlRequest);
                else
                    console.log("Factory: request is valid.");
                    
                request.valid = "true";
                    
                db.close();
                callback(request);
            });
        });
    });
};

exports.checkValidity = function (request, callback){
    console.log("Factory: request handling");
    
    init(request, function(request){
            timeValidity(request, function(request){
            callback(request);
        });
    });
};

