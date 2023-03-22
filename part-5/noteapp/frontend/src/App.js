import { useState, useEffect } from 'react';
import noteService from './services/NoteService';
import loginService from './services/LoginService';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
        <div>
          username
          <input 
            type="text" 
            value={username} 
            name="username" 
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            value={password} 
            name="password" 
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }

  const noteForm = () => {
    return (
      <form onSubmit={addNote} style={{ marginBottom: '1rem' }}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    );
  }

  const addNote = async (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    try {
      const createdNote = await noteService.create(noteObject);
      setNotes(notes.concat(createdNote));
      setNewNote('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create the note, try refreshing the page?');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setErrorMessage(`Failed to login, reason: ${error}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const toggleImportanceOf = async (id) => {
    // Makes reference to note that belongs to `notes` -state variable
    const note = notes.find(note => note.id === id);
    // Makes copy of note (because changing state of note) directly is not allowed in react,
    // e.g. you would have to use `setNotes(...)` and provide a new array as a value
    const changedNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(note => note.id !== id ? note : updatedNote));
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update the note, try refreshing the page?');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // When second parameter of `useEffect` is `[]` it means that the effect is run
  // only after the first render of the component.
  useEffect(() => {
    // We need to declare async function inside our `useEffect` or the code wont compile.
    // Read more: https://devtrium.com/posts/async-functions-useeffect
    const getAllNotes = async () => {
      try {
        const allNotes = await noteService.getAll();
        setNotes(allNotes);
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to load notes, try refreshing the page?');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
    getAllNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {!user && loginForm()}
      {user && 
        <div>
          <p>{user.name} logged in (<a href="#" onClick={handleLogout}>Logout</a>)</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note note={note} toggleImportance={() => toggleImportanceOf(note.id)} key={note.id} />
        )}
      </ul>
      <Footer />
    </div>
  );
}

export default App;
