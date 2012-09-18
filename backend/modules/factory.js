var url = require('url');
var Db = require('mongodb').Db;
var logger = require('./logger');
var Server = require('mongodb').Server;
var assert = require('assert');
var moment = require('moment');
var db;

var dbServerVar = {
    "name":"dbname",
    "port":27017
};

var init = function(request, callback) {
    domainFormatted = request.domain.replace(/\./g,'-');
    dbServerVar.name = domainFormatted;
    
    db = new Db(dbServerVar.name, new Server('localhost', dbServerVar.port, {}), {});
    
    callback(request);
};

var timeValidity = function (request, callback){
    db.open(function(err,db){
        // - temp - Causes many failures, needs monitoring
        if(err) {
                //Handle error
                logger.logRequest('error', "Error checking time validity for request " + request.hash, request);
                return;
        }
        db.collection('visits', function(err,collection){
            collection.find({"ip":request.ip}).sort([['_id', -1]]).nextObject(function(err, item) {
                assert.equal(null, err);
                if(item != null){
                    //console.log("## FACTORY CHECK : %s with %s", request.urlRequest, item.urlRequest);
                    if(item.urlRequest == request.urlRequest)
                        logger.log('info', "Time Validity Fail: Request " + request.hash + " for page " + request.urlRequest + " invalid.");
                    else {
                        logger.log('info', "Time Validity Pass for Request " + request.hash);
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
    // After init, call validity checks
    init(request, function(request){
            timeValidity(request, function(request){
            callback(request);
        });
    });
};

