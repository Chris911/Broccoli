var url = require('url');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var assert = require('assert');
var moment = require('moment');
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
    
    console.log("## Factory: init complete %s, %d", dbServerVar.name, dbServerVar.port);
    callback(request);
};

var timeValidity = function (request, callback){
    db.open(function(err,db){
        // - temp - Causes many failures, needs monitoring
        if(err) {
                //Handle error
                console.log("Exception occured (factory.js/timeValidity): \n");
                console.log("Mongo err : " + err);
                callback(request);
        }
        db.collection('visits', function(err,collection){
            collection.find({"ip":request.ip}).sort([['_id', -1]]).nextObject(function(err, item) {
                if(item != null){
                    console.log("## FACTORY CHECK : %s with %s", request.urlRequest, item.urlRequest);
                    if(item.urlRequest == request.urlRequest)
                        console.log("## Factory: the last request was for the same page, request not valid for %s", request.urlRequest);
                    else {
                        console.log("## Factory: request is valid.");
                        request.valid = "true";
                    } 
                    //now = moment.format();
                    //console.log("Time, %s", moment(item.timestamp).from(a).asSeconds());       
                }                
                db.close();
                callback(request);
            });
        });
    });
};

exports.checkValidity = function (request, callback){
    console.log("## Factory: request handling");
    
    // After init, call validity checks
    init(request, function(request){
            timeValidity(request, function(request){
            callback(request);
        });
    });
};

