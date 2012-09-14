
module.exports = function(dashboard, exp) {

	dashboard.configure(function(){
		dashboard.set('views', dashboard.root + '/dashboard/backend/views');
		dashboard.set('view engine', 'jade');
		dashboard.set('view options', { doctype : 'html' });
		dashboard.set('port', 8080);
		dashboard.locals.pretty = true;
		dashboard.use(exp.bodyParser());
		dashboard.use(exp.cookieParser());
		dashboard.use(exp.session({ secret: 'Abroccoli-session-masterA' }));
		dashboard.use(exp.methodOverride());
		dashboard.use(require('stylus').middleware({ src: dashboard.root + '/dashboard/public' }));
		dashboard.use(exp.static(dashboard.root + '/dashboard/backend'));
		dashboard.use(exp.static(dashboard.root + '/dashboard/public'));
	});
	
}