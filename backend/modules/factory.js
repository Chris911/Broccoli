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
    db = new Db(dbServerVar.name, new Server('localhost', dbServerVar.port, {auto_reconnect: true, poolSize: 2}), {});
    
    callback(request);
};

var timeValidity = function (request, callback){
    db.open(function(err,db){
        if(err) {
                logger.logRequest('error', "Error checking time validity for request (see Mongo logs, avail. connections?) " + request.hash, request);
                return;
        }
        db.collection('visits', function(err,collection){
            collection.find({"clientIp":request.clientIp}).sort([['_id', -1]]).nextObject(function(err, item) {
                assert.equal(null, err);
                if(item != null){
                    if(item.urlRequest == request.urlRequest)
                        logger.log('info', "Time Validity Fail: Request " + request.hash + " for page " + request.urlRequest + " invalid.");
                    else {
                        logger.log('info', "Time Validity Pass for Request " + request.hash);
                        request.valid = true;
                    } 
                    //now = moment.format();
                    //console.log("Time, %s", moment(item.timestamp).from(a).asSeconds());       
                }
                
                db.close(true, function(err,db){
                     callback(request);
                });
            });
        });
    });
};

exports.checkValidity = function (request, callback){
    init(request, function(request){
            timeValidity(request, function(request){
                callback(request);
        });
    });
};

