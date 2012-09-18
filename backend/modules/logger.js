var winston = require('winston');
var moment  = require('moment');

//Again this should be in a config file
var loggerVar = {
    "logDir":"/var/log/Broccoli/",
    "logPrefix":"broccoli"
}

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)(
      	{ 
      		filename: loggerVar.logDir + loggerVar.logPrefix + '.log',
      		json: false,
      		prettyPrint: true,
      		// Colorize is nice when reading log in the console but not in text editor..
      		// Removing for now but might nice to have it (somehow)
      		colorize: false,
      		timestamp: false,
      		handleExceptions: true
      	})
    ]
  });

exports.log = function(level, message) {
	logger.log(level, getTimestamp() + message + "\n");
}

exports.logRequest = function(level, message, request) {
	logger.log(level,
		getTimestamp() + message + "\n\tRequest:\n\t" + request + "\n");
}

var getTimestamp = function() {
	return "[" + moment().format("YYYY.MM.DD-HH:mm:ss:SSS") + "] ";
}