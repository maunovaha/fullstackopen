import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PERSON } from '../queries';

const PersonForm = ({ persons, setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  // An example of how to trigger re-fetch of all persons when new one is added;
  // The downside is that it wont detect in case some other user adds a person remotely.
  //
  // const [createPerson] = useMutation(CREATE_PERSON, {
  //   refetchQueries: [ { query: ALL_PERSONS } ]
  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    createPerson({ variables: { name, street, city, phone } });
    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>Add new person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone <input type="tel" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div>
          Street <input type="text" value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div>
          City <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default PersonForm;