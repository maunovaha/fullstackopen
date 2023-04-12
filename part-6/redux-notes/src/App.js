import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import noteService from './services/NoteService';
import { setNotes } from './reducers/noteReducer';
import NoteFilter from './components/NoteFilter';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initNotes = async () => {
      const notes = await noteService.getAll();
      dispatch(setNotes(notes));
    };
    initNotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <NoteForm />
      <NoteFilter />
      <NoteList />
    </div>
  );
};

export default App;
