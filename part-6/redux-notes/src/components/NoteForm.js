import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/NoteService';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    const newNote = await noteService.create(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" /> 
      <button type="submit">Add</button>
    </form>
  );
};

export default NoteForm;
