import NoteFilter from './components/NoteFilter';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  return (
    <div>
      <NoteForm />
      <NoteFilter />
      <NoteList />
    </div>
  );
};

export default App;
