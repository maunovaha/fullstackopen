import { useState, useEffect } from 'react';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import LoginForm from './components/LoginForm';
import ChangePhoneNumberForm from './components/ChangePhoneNumberForm';
import Notify from './components/Notify';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

// Function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  const data = cache.readQuery(query);
  const existingPersons = data.allPersons;

  // Check if the added person already exists in the cache
  const personExists = existingPersons.some(
    (person) => person.id === addedPerson.id
  );

  if (!personExists) {
    cache.writeQuery({
      ...query,
      data: {
        ...data,
        allPersons: [...existingPersons, addedPerson],
      },
    });
  }
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const result = useQuery(ALL_PERSONS, { skip: !token }); // Runs the query only when logged in

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added!`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    }
  });

  // const result = useQuery(ALL_PERSONS, {
  //   skip: !token, // Runs the query only when logged in
  //   pollInterval: 5000
  // });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const logout = () => {
    localStorage.clear();
    // To ensure the Apollo Client cache is cleared, it's important to reset it when
    // a user logs out or when the authentication status changes. This ensures that any
    // cached data related to the logged-in user is removed.
    client.resetStore();
    setToken(null);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('phonebook-user-token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <p>Logged in as visitor <button onClick={logout}>Logout</button></p>
      <PersonForm setError={notify} />
      <PersonList persons={result.data.allPersons} />
      <ChangePhoneNumberForm setError={notify} />
    </>
  );
};

export default App;