import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" /> 
      <button type="submit">Add</button>
    </form>
  );
};

export default NoteForm;
