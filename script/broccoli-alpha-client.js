var $pathname = window.location.pathname;
var $param = window.location.search;
$(window).load(function() {
	$.ajax({
		url: 'http://kepler.step.polymtl.ca:8080',
		type: 'GET',
		data: $pathname + $param
	});
});



