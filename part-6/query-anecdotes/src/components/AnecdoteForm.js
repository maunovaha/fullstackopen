import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../services/AnecdoteService';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
    }
  });

  const onCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;

    if (content.length === 0) {
      return;
    }

    e.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
