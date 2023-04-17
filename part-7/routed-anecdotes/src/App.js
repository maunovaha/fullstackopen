import { useState } from 'react';
import { Link, Routes, Route, useMatch, useNavigate } from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link to="/" style={padding}>Anecdotes</Link>
      <Link to="/anecdotes/new" style={padding}>Create new</Link>
      <Link to="/about" style={padding}>About</Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <div>
        <h2>{anecdote.content}</h2>
        <div>{anecdote.author}</div>
        <div>{anecdote.info}</div>
        <div>Votes: {anecdote.votes}</div>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <br />
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  );
};

const Notification = ({ message }) => {
  if (!message || message.length === 0) {
    return null;
  }

  return (
    <p>{message}</p>
  );
};

const CreateNew = ({ addNew }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0
    });
    navigate('/');
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]);
  const [notification, setNotification] = useState('');
  const match = useMatch('/anecdotes/:id');
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null;

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`A new anecdote '${anecdote.content}' created!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const anecdoteById = (id) => anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/anecdotes/new" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
