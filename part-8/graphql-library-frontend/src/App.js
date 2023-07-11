import { useState, useEffect } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import LoginForm from './components/LoginForm';
import { BOOK_ADDED, ALL_BOOKS, ALL_GENRES } from './queries';

export const updateCache = (cache, addedBook) => {
  // All genres are queried using a `null` variable, so they should be always present in the array
  const addedGenres = [null, ...addedBook.genres];

  // Books are cache using their specific genre keys
  addedGenres.forEach((genre) => {
    const variables = { genre };
    const data = cache.readQuery({ query: ALL_BOOKS, variables });
    const existingBooks = data ? data.allBooks : [];

    // Check if the added book already exists in the cache
    const bookExists = existingBooks.some(book => book.id === addedBook.id);

    if (!bookExists) {
      cache.writeQuery({
        query: ALL_BOOKS,
        variables,
        data: {
          ...data,
          allBooks: [...existingBooks, addedBook],
        },
      });
    }
  });

  // Genres cache needs to be updated as well e.g. to allow filtering using new genres
  updateGenresCache(cache, addedBook.genres);
};

const updateGenresCache = (cache, addedGenres) => {
  if (addedGenres.length === 0) {
    return;
  }

  const data = cache.readQuery({ query: ALL_GENRES });
  const existingGenres = data ? data.allGenres : [];

  // Check which genres (if any) are missing from the cache
  const missingGenres = addedGenres.filter(genre => !existingGenres.includes(genre));

  if (missingGenres.length > 0) {
    cache.writeQuery({
      query: ALL_GENRES,
      data: {
        ...data,
        allGenres: [...new Set([...existingGenres, ...missingGenres])]
      },
    });
  }
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setToken(null);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log("Book added:", addedBook);
      updateCache(client.cache, addedBook);
    }
  });

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
