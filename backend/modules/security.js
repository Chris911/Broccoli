var url = require('url');
var Db = require('mongodb').Db;
var logger = require('./logger');
var Server = require('mongodb').Server;
var assert = require('assert');
var db;

var dbServerVar = {
    "name":"siteIdentification",
    "idCheckTable":"hashId", // replace
    "port":27017
};

var init = function(request, callback) {
    db = new Db(dbServerVar.idCheckTable, new Server('localhost', dbServerVar.port, {auto_reconnect: true, poolSize: 2}), {});
    callback(request);
};

var idCheck = function (request, callback){
    var isKnown = false;
    db.open(function(err,db){
        if(err) {
                logger.logRequest('error', "Error checking time validity for request (see Mongo logs, avail. connections?) " + request.hash, request);
                return;
        }
        db.collection('sites', function(err,collection){
            collection.find({"site":request.domain}).sort([['_id', -1]]).nextObject(function(err, item) {
                assert.equal(null, err);
                if(item != null){
                    isKnown = true;
                    request.storingHash = item.hash;
                }
                else{
                    request.storingHash = "0000000";
                }
                
                db.close(true, function(err,db){
                     callback(request, isKnown);
                });
            });
        });
    });
};

exports.idCheck = function (request, callback){
    init(request, function(request){
            idCheck(request, function(request, idCheck){
                callback(request, idCheck);
        });
    });
};

