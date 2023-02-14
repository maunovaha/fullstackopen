import { useState } from 'react';
import PhoneNumberForm from './components/PhoneNumberForm';
import PhoneNumberList from './components/PhoneNumberList';
import PhoneNumberSearch from './components/PhoneNumberSearch';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phoneNumber: '0400111222' }]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [keyword, setKeyword] = useState('');
  const filteredPersons = keyword.length 
    ? persons.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))
    : persons;

  const addPerson = (e) => {
    e.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);

    if (alreadyAdded) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = { 
        name: newName,
        phoneNumber: newPhoneNumber
      };
      setPersons(persons.concat(person));
      setNewName('');
      setNewPhoneNumber('');
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <PhoneNumberSearch keyword={keyword} handleSearch={(e) => setKeyword(e.target.value)} />
      <h2>Add a new</h2>
      <PhoneNumberForm 
        name={newName}
        phoneNumber={newPhoneNumber}
        handleSubmit={addPerson}
        handleNameChange={(e) => setNewName(e.target.value)}
        handlePhoneNumberChange={(e) => setNewPhoneNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <PhoneNumberList entries={filteredPersons} />
    </div>
  );
}

export default App;
