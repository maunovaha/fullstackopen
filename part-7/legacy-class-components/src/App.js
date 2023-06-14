import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anecdotes: [],
      current: 0
    };
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:3001/anecdotes');
    this.setState({ anecdotes: response.data });
  }

  // Note: I need to use the following syntax rather than `handleClick() { ... }`, otherwise
  // the value of "this" is undefined.
  handleClick = () => {
    const current = Math.floor(
      Math.random() * (this.state.anecdotes.length - 1)
    );
    this.setState({ current });
  }

  render() {
    console.log(this)

    if (this.state.anecdotes.length === 0) {
      return <div>No anecdotes...</div>;
    }

    return (
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {this.state.anecdotes[this.state.current].content}
        </div>
        <button onClick={this.handleClick}>Next</button>
      </div>
    );
  }
}

export default App;

// Example of doing the same functionality, using a functional component (preferred):

/*
const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() =>{
    axios.get('http://localhost:3001/anecdotes').then(response => {
      setAnecdotes(response.data)
    })
  },[])

  const handleClick = () => {
    setCurrent(Math.round(Math.random() * (anecdotes.length - 1)))
  }

  if (anecdotes.length === 0) {
    return <div>no anecdotes...</div>
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <div>{anecdotes[current].content}</div>
      <button onClick={handleClick}>next</button>
    </div>
  )
}
*/
