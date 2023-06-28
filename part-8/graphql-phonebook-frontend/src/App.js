import { useState } from 'react';
import { useQuery } from '@apollo/client';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import ChangePhoneNumberForm from './components/ChangePhoneNumberForm';
import Notify from './components/Notify';
import { ALL_PERSONS } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 20000
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PersonList persons={result.data.allPersons} />
      <ChangePhoneNumberForm setError={notify} />
    </>
  );
};

export default App;