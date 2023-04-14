import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, voteAnecdote } from './services/AnecdoteService';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import NotificationContext from './NotificationContext';

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (updatedAnecdote) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `You voted '${updatedAnecdote.content}'` });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);
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
    retry: 3,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      // The initial 'Loading...' text needs to be cleared immediately from the screen. Atm. I don't know any other
      // place than this callback for doing it.
      if (notification === 'Loading...') {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }
    },
    onError: () => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote service not available due to problems in the server.' });
    }
  });

  const anecdotes = result.isSuccess ? result.data : [];

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      {result.isSuccess &&
        <>
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
        </>
      }
    </div>
  );
};

export default App;
