var winston = require('winston');

//Again this should be in a config file
var loggerVar = {
    "logDir":"/var/log/Broccoli/"
    "logPrefix":""
}

winston.add(winston.transports.File, {
    filename: loggerVar.logDir + loggerVar.logPrefix + '.log',
  });

winston.add(winston.transports.File, {
    filename: loggerVar.logDir + loggerVar.logPrefix + "-Exceptions" + '.log',
    handleExceptions: true
});