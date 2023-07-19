import { useState, useEffect } from 'react';
import { getAllNotes, createNote } from './services/noteService';
import { Note } from '../types';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  // const [notes, setNotes] = useState<Note[]>([
  //   { id: 1, content: 'Testing' }
  // ]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const createdNote = await createNote({ content: newNote });
    setNotes([...notes, createdNote]);
    setNewNote('');
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await getAllNotes();
      setNotes(allNotes);
      setLoading(false);
    };
    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

