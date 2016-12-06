class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log('this in constructor is: ', this);
    this.state = {titleInput: '', yearInput: '', ratingInput: '', commentInput: '', imdbRating: '', allMovies: []}; //not sure why I'd typed this
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // console.log('component will mount!');
    this.displayMovies();
  }

  handleChange(event) {
    // console.log('this is, ', this, 'event is', event, 'event target is', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    var movieTitle = this.state.titleInput;
    var movieYear = this.state.yearInput;
    var movieRating = this.state.ratingInput;
    var movieComment = this.state.commentInput;
    $.ajax({
      method: 'GET',
      url: 'http://www.omdbapi.com/?t=' + movieTitle + '&y=' + movieYear + '&plot=short&r=json',
      success: (function(data) {
        this.setState({titleInput: ''});
        this.setState({yearInput: ''});
        this.setState({ratingInput: ''});
        this.setState({commentInput: ''});
        console.log('data that comes in from the api is: ', data);
        // console.log('this is: ', this, 'this.state.titleInput', this.state.titleInput, 'this.state.ratingInput', this.state.ratingInput, 'this.state.commentInput', this.state.commentInput);
        $.ajax({
          method: 'POST',
          url: '/',
          data: {'title': movieTitle,
            'year': movieYear || data.Year, 
            'rating': movieRating,
            'comment': movieComment,
            'metascore': data.Metascore,
            'actors': data.Actors,
            'plot': data.Plot,
            'rated': data.Rated,
            'genre': data.Genre,
            'language': data.Language,
            'runtime': data.Runtime 
          },
          success: function() {
          }
        });
        this.displayMovies()
      }).bind(this),
      error: function(err){
        throw 'not working. blame the api not me'
      }
    });
  } 

  displayMovies() {
      console.log('function starts');
      $.ajax({
      method: 'GET',
      url: '/movies',
      dataType: 'json',
      success: (function(data){
        // console.log('data is: ', data);
        console.log('this is: ', this);
        this.setState({allMovies: data});
        // console.log('this.state', this.state);
      }).bind(this),
      error: function(err){
        throw 'not working, here is why: ', err
      }
      })
    }
/*
  getMovieInfo() {
    $.ajax({
      method: 'GET',
      url: 'http://www.omdbapi.com/?t=' + 'this.state.title' + '&y=&plot=short&r=json',
      dataType: 'json',
      success: function(data){
        this.setState('movieInfo', data);
      },
      error: function(err) {
        throw 'the error is: ', err;
      }
    })
  }
*/
  render() {
    return (
    <div className="header">
      <h1>Movie Tracker</h1>
      <form className="movie-form">
        <div className="enter-movie">
          <label>Title: </label>
          <input type="text" name="titleInput" onChange={this.handleChange} value={this.state.titleInput}></input>
        </div>
        <div className="enter-movie">
          <label>Year: </label>
          <input type="text" name="yearInput" onChange={this.handleChange} value={this.state.yearInput}></input>
        </div>
        <div className="enter-movie">
          <label>Rating: </label>
          <input type="text" name="ratingInput" onChange={this.handleChange} value={this.state.ratingInput}></input>
        </div>
        <div className="enter-movie">
          <label>Comment: </label>
          <input type="text" name="commentInput" onChange={this.handleChange} value={this.state.commentInput}></input>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </form>
      <h2>All Movies I've Seen</h2>
      <ol>
        {/*this.state.allMovies.reduce(function (a, b) { return (a.title || a) + ', ' + b.title; }, '')*/}
        {this.state.allMovies.map(function(movie, index){
          console.log(movie);
          return (<li key={index}> Title: {movie.title}, Year: {movie.year || 'unknown year'}, Rating: {movie.rating}, Review: {movie.comment}, Metascore: {movie.metascore}, Actors: {movie.actors}, Plot: {movie.plot}, Rated: {movie.rating}, Genre: {movie.genre}, Language: {movie.language}, Runtime: {movie.runtime}</li>)
        })}
      </ol>
    </div>
    );
  }
}


