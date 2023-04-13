import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes');
      queryClient.setQueryData('notes', notes.concat(newNote));
      // The code below works as it causes re-fetch of all the notes from the server; but
      // it might have performance implications; So we are not going to use it.
      // queryClient.invalidateQueries('notes');
    }
  });
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData('notes');
      queryClient.setQueryData('notes', notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    }
  });

  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.note.value;

    if (content.length === 0) {
      return;
    }

    e.target.note.value = '';
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  const result = useQuery('notes', getNotes, {
    // Makes sure that focusing the input does not query new notes automatically
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const notes = result.data;

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  );
};

export default App;
