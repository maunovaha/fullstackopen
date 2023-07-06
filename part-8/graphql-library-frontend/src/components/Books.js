import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const availableGenres = (books) => {
  return [...new Set(books.map(book => book.genres).flat())];
};

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 5000
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
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
          {result.data.allBooks.map((book) => (
            <tr key={book.title}>
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
        {availableGenres(result.data.allBooks).map((genre) => (
          <button onClick={() => setGenre(genre)}>{genre}</button>
        ))}
      </div>
    </div>
  );
};

export default Books;
