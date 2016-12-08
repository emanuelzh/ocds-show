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

app.get('/*', function(request, response) {
  var http = require('http');
  var fs = require('fs');

  var file = fs.createWriteStream("file.jpg");
  var req = http.get(request[0], function(response) {
    response.pipe(file);
  }
  
  response.send(request.params);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
