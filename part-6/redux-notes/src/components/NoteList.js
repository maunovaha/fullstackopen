import { useSelector, useDispatch } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import NoteListItem from './NoteListItem';

const filterNotes = (filter, notes) => {
  switch(filter) {
    case 'IMPORTANT':
      return notes.filter(note => note.important);
    case 'NONIMPORTANT':
      return notes.filter(note => !note.important);
    default:
      return notes;
  }
};

// "Container component" as it includes business logic and dictates the behavior of presentational component(s)
const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => filterNotes(filter, notes));

  return (
    <ul>
      {notes.map(note =>
        <NoteListItem key={note.id} note={note} onClick={() => dispatch(toggleImportanceOf(note.id))} />
      )}
    </ul>
  );
};

export default NoteList;
