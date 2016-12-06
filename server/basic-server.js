//'/Users/student/Desktop/hrsf50-mvp/index.html'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./make-mongo-db.js');
// console.log('db is: ', db);

app.listen(8000);
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', function(request, response) {
  console.log('request data is: ', request.body);
  db.insertMovie(request.body, function(){
  })
});

app.get('/movies', function(request, response){
  db.listAllMovies(function(data){
    response.send(data);
  });
})




