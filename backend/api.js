// API Access Point
var express = require('express');
var apiServer = express();

apiServer.get('/', function(req, res){
  res.send('Brocolli API - alpha');
});

apiServer.get('/get', function(req, res){
  res.send('Broccoli API - /get');
});

apiServer.post('/post', function(req, res){
  res.send('Broccoli API - /post');
});

apiServer.listen(8081);
console.log('Server running : 8081');
