var url = require('url');
var Db = require('mongodb').Db;
var logger = require('./logger');
var Server = require('mongodb').Server;
var assert = require('assert');
var moment = require('moment');
var db;

var dbServerVar = {
    "name":"dbname-apiServer",
    "port":27017
};

// Init : formats the domain to a proper db name and create the db connection
var init = function(jsonObj, callback) {
    domainFormatted = jsonObj.domain.replace(/\./g,'-');
    jsonObj.dbFormatted = domainFormatted;    
    db = new Db(jsonObj.dbFormatted, new Server('localhost', dbServerVar.port, {auto_reconnect: true, poolSize: 2}), {});
    
    callback(jsonObj);
};

var visitsCount = function (jsonObj, callback){
    db.open(function(err,db){
        if(err) {
            logger.logRequest('error', "Error checking visitsCount for APIrequest (see Mongo logs, avail. connections?) " + request.hash, request);
            return;
        }
        db.collection('visits', function(err,collection){
            collection.count(function(err, count){
                jsonObj.visits = count;
                callback(jsonObj);
            });
        
        });
    });
};

exports.visits = function (domain, callback){

    // - temp - Object won't be created here.
    var jsonObj = {
        "domain":domain,
        "dbFormatted":"",
        "visits":""
    }

    init(jsonObj, function(jsonObj){
            visitsCount(jsonObj, function(jsonObj){
            callback(jsonObj);
        });
    });
};

