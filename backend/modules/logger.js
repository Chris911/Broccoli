var winston = require('winston');
var moment  = require('moment');

//Again this should be in a config file
var loggerVar = {
    "logDir":"/var/log/broccoli/",
    "logPrefix":"broccoli-"
}

var getTimestamp = function() {
  return "[" + moment().format("YYYY.MM.DD-HH:mm:ss:SSS") + "] ";
}

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)(
        { 
          filename: loggerVar.logDir + loggerVar.logPrefix + moment().format("YYYY.MM.DD-HH:mm:ss") + '.log',
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

// Log a message
exports.log = function(level, message) {
  logger.log(level, getTimestamp() + message + "\n");
}

// Used to log message including a JSON request object
exports.logRequest = function(level, message, request) {
  logger.log(level,
    getTimestamp() + message + "\n\tRequest:\n" + JSON.stringify(request, null, 8) + "\n");
}