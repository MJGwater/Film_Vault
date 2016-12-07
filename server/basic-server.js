//'/Users/student/Desktop/hrsf50-mvp/index.html'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var session = require('express-session');
var app = express();
var db = require('./make-mongo-db.js');
// console.log('db is: ', db);

app.use(express.static('client'));
/*
app.use(sesssion({cookie: { 
  secure: true 
  } 
}));
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var loggedIn = true;

/*
app.get('/', function(request, response){
  var options = {
    root: __dirname + 'client/compiled/index.html'
  if (loggedIn) {
    console.log(__dirname);
    // response.sendFile('/Users/student/Documents/hrsf50-mvp/client/compiled/index.html')
    response.sendFile(path.join(__dirname, '..', 'client/compiled/index.html'))
  }
})
*/

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

app.listen(8000);

