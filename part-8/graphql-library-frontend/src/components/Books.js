import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const allGenresResult = useQuery(ALL_GENRES, {
    pollInterval: 5000
  });
  const allBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 5000
  });

  if (!props.show) {
    return null;
  }

  if (allGenresResult.loading || allBooksResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksResult.data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Filter books by genre:</p>
        <button onClick={() => setGenre(null)}>All genres</button>
        {allGenresResult.data.allGenres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
      </div>
    </div>
  );
};

export default Books;
