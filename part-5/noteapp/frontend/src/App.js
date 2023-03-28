import { useState, useEffect, useRef } from 'react';
import noteService from './services/NoteService';
import loginService from './services/LoginService';
import Note from './components/Note';
import Notification from './components/Notification';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = async (note) => {
    const noteObject = { ...note, id: notes.length + 1 };

    try {
      const createdNote = await noteService.create(noteObject);
      setNotes(notes.concat(createdNote));
      noteFormRef.current.toggleVisibility();
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to create the note, try refreshing the page?');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
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
      
      {!user && 
        <Toggleable buttonLabel='login'>
          <LoginForm onLogin={handleLogin} />
        </Toggleable>
      }
      {user && 
        <div>
          <p>{user.name} logged in (<a href="#" onClick={handleLogout}>Logout</a>)</p>
          <Toggleable buttonLabel='New note' ref={noteFormRef}>
            <NoteForm onCreateNote={addNote} />
          </Toggleable>
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
