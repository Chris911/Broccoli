// Variable declaration for request to main server
var $pathname = window.location.pathname;
var $param = window.location.search;

// Load the jquery script if needed
function loadjQuery(url, callback) {
	if (typeof jQuery == 'undefined') {
		console.log("jQuery will be loaded");
		var script = document.createElement("script")
        	script.type = "text/javascript";

        	if (script.readyState) { // ie
	                script.onreadystatechange = function () {
	                        if (script.readyState == "loaded" || script.readyState == "complete") {
	                                script.onreadystatechange = null;
	                                callback();
	                        }
	                };
	        } else { // Chrome - firefox
	                script.onload = function () {
	                	callback();
	                };
	        }
	
	        script.src = url;
	        document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		console.log("jQuery won't be loaded");
		callback();
	}
}

// Load the script if needed, make jquery ajax request using callback
// - Be up-to-date with latest version from Google :
// - https://developers.google.com/speed/libraries/devguide#jquery
loadjQuery("https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js", function ajax(){
	$(window).load(function() {
		$.ajax({
			url: 'http://kepler.step.polymtl.ca:8080',
			type: 'GET',
			data: $pathname + $param
		});
	});
});


