import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setToken(null);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add book</button>
        <button onClick={() => setPage('recommend')}>Recommend</button>
        <button onClick={logout}>Log out</button>
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
    </div>
  );
};

export default App;
