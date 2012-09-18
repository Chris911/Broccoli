var url = require('url');
var logger = require('./logger');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db;

var dbServerVar = {
    "name":"dbname",
    "port":27017
};

var init = function(request, callback){
    domainFormatted = request.domain.replace(/\./g,'-');
    dbServerVar.name = domainFormatted;
    
    db = new Db(dbServerVar.name, new Server('localhost', dbServerVar.port, {}), {});
    
    callback(request);
};

var insert = function(request){
    logger.log('info', "Event: Adding request " + request.hash + " to database.")

    db.open(function() {
        db.collection('visits', function(err, collection) {
            if(err) {
                //Handle error
                logger.logRequest('error', "Error adding request " + request.hash + " to database" , request);
                return;
            }
            collection.insert(request, function() {
                logger.log('info', "Event: Successfully added request " + request.hash + " to database.")
            });
        });
    });

};

exports.insert = function(request){
    init(request, function(request) {
        insert(request);
    });
};