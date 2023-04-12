import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initNotes } from './reducers/noteReducer';
import NoteFilter from './components/NoteFilter';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initNotes());
  }, [dispatch]);

  return (
    <div>
      <NoteForm />
      <NoteFilter />
      <NoteList />
    </div>
  );
};

export default App;
