import { useState } from 'react';

const NoteForm = ({ onCreateNote }) => {
  const [note, setNote] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    onCreateNote({ content: note, important: true });
    setNote('');
  };

  return (
    <form onSubmit={addNote} style={{ marginBottom: '1rem' }}>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write a note.." />
      <input type="submit" value="Save" />
    </form>
  );
};

export default NoteForm;