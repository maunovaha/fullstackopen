import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Person from './Person';
import { FIND_PERSON } from '../queries';

const PersonList = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    // Using skip we are able to avoid executing GraphQL query when the component
    // is rendered for the first time and value of `nameToSearch` is null.
    skip: !nameToSearch
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => 
        <div key={p.id}>
          {p.name} {p.phone ? p.phone : <em>(phone number not known)</em>}
          <button onClick={() => setNameToSearch(p.name)}>
            Show address
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonList;