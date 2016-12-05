//'/Users/student/Desktop/hrsf50-mvp/index.html'

var express = require('express');
var app = express();

app.listen(8000);
app.use(express.static('client'));

/*
app.get('/', function(request, response) {
  // response.send('<div>Hello World</div>');
  response.render('../client/index', function() {
  });
});
*/