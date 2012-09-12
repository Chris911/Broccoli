// Pour nos reference personnelles : http://www.slideshare.net/ggoodale/getting-started-with-mongodb-and-nodejs

var mongo = require('/home/pag/public_html/node_modules/mongodb'),
	db = new mongo.Db('mydb', new mongo.Server('localhost', 27017, {}), {});

db.open(function() {
	
	db.collection('testCollection', function(err, collection){
		doc={
			"name"	:	"MongoDB",
			"type"	:	"database",
			"count"	:	1
		};

	collection.insert(doc, function(){
	console.log("inserted");
	});
	});
});
