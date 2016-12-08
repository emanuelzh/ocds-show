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

  var file = fs.createWriteStream("file.json");
  var req = http.get(request[0].substring(1), function(response) {
    response.pipe(file);
  });
  var global_data = fs.readFileSync("file.json").toString();
  response.send(file.json);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
