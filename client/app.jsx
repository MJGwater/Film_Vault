class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('this in constructor is: ', this);
    // this.state = {value: ''}; //not sure why I'd typed this
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    console.log('this is, ', this, 'event is', event, 'event target is', event.target);
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    event.preventDefault();
    console.log('this is: ', this, 'this.state.titleInput', this.state.titleInput, 'this.state.ratingInput', this.state.ratingInput, 'this.state.commentInput', this.state.commentInput);
    /*
    return $.ajax({
      method: 'POST',
      url: 
    })*/
  }

  render() {
    return (
    <div className="header">
      <h1>Movie Tracker</h1>
      <form>
        <div className="enter-movie">
          <label>Title: </label>
          <input type="text" name="titleInput" onChange={this.handleChange}></input>
        </div>
        <div className="enter-movie">
          <label>Rating: </label>
          <input type="text" name="ratingInput" onChange={this.handleChange}></input>
        </div>
        <div className="enter-movie">
          <label>Comment: </label>
          <input type="text" name="commentInput" onChange={this.handleChange}></input>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </form>
    </div>
    );
  }
}


