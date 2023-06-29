import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const BirthyearForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, setBornTo: Number(born) } });
    setName('');
    setBorn('');
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('Author not found');
    }
  }, [result.data]); // Runs effect every time when the value of `result.data` changes

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default BirthyearForm;
