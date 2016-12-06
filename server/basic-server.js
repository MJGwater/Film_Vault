//'/Users/student/Desktop/hrsf50-mvp/index.html'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen(8000);
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('', function(request, response) {
  console.log('request data is: ', request.body);
});

/*
app.get('/', function(request, response) {
  // response.send('<div>Hello World</div>');
  response.render('../client/index', function() {
  });
});
*/