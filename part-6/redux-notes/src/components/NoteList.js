import { useSelector, useDispatch } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';
import NoteListItem from './NoteListItem';

// "Container component" as it includes business logic and dictates the behavior of presentational component(s)
const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state); // or e.g. `state => state.filter(note => note.important);`
  return (
    <ul>
      {notes.map(note =>
        <NoteListItem key={note.id} note={note} onClick={() => dispatch(toggleImportanceOf(note.id))} />
      )}
    </ul>
  );
};

export default NoteList;
