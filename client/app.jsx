class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('this in constructor is: ', this);
    this.state = {titleInput: '', ratingInput: '', commentInput: ''}; //not sure why I'd typed this
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    console.log('component will mount!');
    this.displayMovies();
  }

  handleChange(event) {
    console.log('this is, ', this, 'event is', event, 'event target is', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    var movieTitle = this.state.titleInput;
    var movieRating = this.state.ratingInput;
    var movieComment = this.state.commentInput;
    this.setState({titleInput: ''});
    this.setState({ratingInput: ''});
    this.setState({commentInput: ''});
    console.log('this is: ', this, 'this.state.titleInput', this.state.titleInput, 'this.state.ratingInput', this.state.ratingInput, 'this.state.commentInput', this.state.commentInput);
    return $.ajax({
      method: 'POST',
      url: '/',
      data: {'title': movieTitle, 
        'rating': movieRating,
        'comment': movieComment
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
        console.log('data is: ', data);
        console.log('this is: ', this);
        this.setState({allMovies: data});
        console.log('this.state', this.state);
      }).bind(this),
      error: function(err){
        throw 'not working, here is why: ', err
      }
      })
    }

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
    </div>
    );
  }
}


