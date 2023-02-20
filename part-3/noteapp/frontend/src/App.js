import { useState, useEffect } from 'react';
import noteService from './services/NoteService';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

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
      setErrorMessage(`Failed to create the note, try refreshing the page?`);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
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
      setErrorMessage(`Failed to update the note, try refreshing the page?`);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

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
        setErrorMessage(`Failed to load notes, try refreshing the page?`);
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App;
