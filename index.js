//var host = '0.0.0.0';
//var port = process.env.PORT || 8080;

//var cors_proxy = require('cors-anywhere');
//cors_proxy.createServer({
//    originWhitelist: [], // Allow all origins
//    requireHeader: ['origin', 'x-requested-with'],
//    removeHeaders: ['cookie', 'cookie2']
//}).listen(port, host, function() {
//    console.log('Running CORS Anywhere on ' + host + ':' + port);
//});

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/favicon.ico', function(request, response) {
});

app.get('/proxy/*', function(request, response) {
  var http = require('http');
  var https = require('https');

  console.log(request.params[0].substr(0));
  https.get(request.params[0].substr(0), (res) => {
   res.on('data', (body) => {
     response.end(body);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
