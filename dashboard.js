/**
 * Broccoli Dashboard - Alpha
 * Author : Christophe
 */
 
var express   = require('express');
var dashboard = express();

dashboard.root = __dirname;
global.host = 'localhost';

require('./dashboard/config')(dashboard, express);
require('./dashboard/backend/router')(dashboard);

dashboard.listen(dashboard.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", dashboard.get('port'), dashboard.settings.env);
});
