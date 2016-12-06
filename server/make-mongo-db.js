var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moviesdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  comment: String,
  metascore: Number,
  actors: String,
  plot: String,
  rated: String,
  genre: String,
  language: String,
  runtime: String
})

var Movies = mongoose.model('Movies', movieSchema);

module.exports.insertMovie = function(data, callback) {
  var newMovie = new Movies({title: data.title, year: data.year, rating: data.rating, comment: data.comment, metascore: data.metascore, actors: data.actors, plot: data.plot, rated: data.rated, genre: data.genre, language: data.language, runtime: data.runtime});
  console.log('newMovie created', newMovie);
  newMovie.save(function(err, cb){
    if (err) {
      return console.error(err);
    }
    console.log('movie is supposed to be saved now');
    callback();
    console.log('hits here');
  });
}

module.exports.listAllMovies = function(cb) {
  // console.log('Movies is: ', Movies.find());
  Movies.find(function(err, data){
    console.log('arguments is: ', arguments);
    console.log('data in listAllMovies is: ', data);
    cb(data);
  })
}



/*
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  createValidatedMovies(db, function(){ //currently createValidatedMovies is commented out so this would need to be adjusted unless I decomment that
    db.close(); //if createValidatedMovies stays commented out make sure to keep this line
  })
});
*/


/*
//the below function probably isn't necessary, unless I care about validation b/c it turns out that if a collection doesn't exist mongo creates it for you. http://mongodb.github.io/node-mongodb-native/2.2/tutorials/crud/
var createValidatedMovies = function(db, callback) {
  db.createCollection('movies', {
    'validator': {
      '$and': [
        {'title': {'$type': "string"} },
        {'rating': {'$type': "number"} },
        {'comment': {'$type': "string"} },
      ]
    }
  });
}
*/

/*
var insertAMovie = function(db, callback) {
  var collection = db.collection('movies');
  collection.insertOne({'title': ?, 'rating': ?, 'comment': ?}, function(err, cb){
    db.close();
  })
}
*/