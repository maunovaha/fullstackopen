import { useQuery, useMutation, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, voteAnecdote } from './services/AnecdoteService';

const App = () => {
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ));
    }
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <Notification message={'Loading...'} />;
  } else if (result.isError) {
    return <Notification message={'Anecdote service not available due to problems in the server.'} />;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
