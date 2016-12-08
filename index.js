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

app.get('/*', function(request, response) {
  var http = require('http');
  var https = require('https');

  var json_download = "";

  console.log(request.params[0].substr(0));
  https.get(request.params[0].substr(0), (res) => {
    res.on('data', (body) => {
      console.log(body);
      json_download += body;
    });
  });
  console.log(json_download);
  response.send(json_download);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
