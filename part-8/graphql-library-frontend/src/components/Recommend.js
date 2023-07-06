import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PERSONAL_INFO, ALL_BOOKS } from '../queries';

const Recommend = (props) => {
  const [genre, setGenre] = useState(null);
  const personalInfoResult = useQuery(PERSONAL_INFO);
  const allBooksResult = useQuery(ALL_BOOKS, { variables: { genre } });

  useEffect(() => {
    if (!personalInfoResult.loading) {
      setGenre(personalInfoResult.data.me.favoriteGenre);
    }
  }, [personalInfoResult]);

  if (!props.show) {
    return null;
  }

  if (personalInfoResult.loading || allBooksResult.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksResult.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
