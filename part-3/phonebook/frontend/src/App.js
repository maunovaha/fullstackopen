import { useState, useEffect } from 'react';
import phoneNumberService from './services/PhoneNumberService';
import PhoneNumberForm from './components/PhoneNumberForm';
import PhoneNumberList from './components/PhoneNumberList';
import PhoneNumberSearch from './components/PhoneNumberSearch';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [keyword, setKeyword] = useState('');
  const [notification, setNotification] = useState({});
  const filteredPersons = keyword.length 
    ? persons.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase()))
    : persons;

  const showNotification = (message, success) => {
    setNotification({ message: message, type: success ? 'success' : 'error' });
    setTimeout(() => {
      setNotification({});
    }, 3000);
  }

  const addOrUpdatePerson = async (e) => {
    e.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);

    if (alreadyAdded) {
      if (window.confirm(`${alreadyAdded.name} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...alreadyAdded, phoneNumber: newPhoneNumber };

        try {
          const updatedPerson = await phoneNumberService.update(changedPerson);
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
          setNewName('');
          setNewPhoneNumber('');
          showNotification(`Updated ${updatedPerson.name}'s details to the phonebook`, true);
        } catch (error) {
          console.error(error);
          if (error.response.status === 400) {
            showNotification(error.response.data.error, false);
          } else {
            showNotification(`Failed to update ${alreadyAdded.name}'s details to the phonebook, try refreshing the page?`, false);
          }
        }
      }
    } else {
      const person = { 
        name: newName,
        phoneNumber: newPhoneNumber
      };

      try {
        const createdPerson = await phoneNumberService.create(person);
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewPhoneNumber('');
        showNotification(`Added ${createdPerson.name}'s details to the phonebook`, true);
      } catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          showNotification(error.response.data.error, false);
        } else {
          showNotification(`Failed to add the person details to phonebook, try refreshing the page?`, false);
        }
      }
    }
  }

  const deletePerson = async (id) => {
    const personToBeDeleted = persons.find(person => person.id === id);

    if (personToBeDeleted && window.confirm(`Delete ${personToBeDeleted.name}?`)) {
      try {
        await phoneNumberService.destroy(personToBeDeleted.id);
        setPersons(persons.filter(person => person.id !== personToBeDeleted.id));
        showNotification(`Removed ${personToBeDeleted.name}'s details from the phonebook`, true);
      } catch (error) {
        console.error(error);
        showNotification(`Failed to delete ${personToBeDeleted.name}'s details from the phonebook, try refreshing the page?`, false);
      }
    }
  }

  useEffect(() => {
    const getAllPhoneNumbers = async () => {
      try {
        const allPhoneNumbers = await phoneNumberService.getAll();
        setPersons(allPhoneNumbers);
      } catch (error) {
        console.error(error);
        showNotification(`Failed to load phone numbers, try refreshing the page?`, false);
      }
    }
    getAllPhoneNumbers();
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <PhoneNumberSearch keyword={keyword} handleSearch={(e) => setKeyword(e.target.value)} />
      <h2>Add a new</h2>
      <PhoneNumberForm 
        name={newName}
        phoneNumber={newPhoneNumber}
        handleSubmit={addOrUpdatePerson}
        handleNameChange={(e) => setNewName(e.target.value)}
        handlePhoneNumberChange={(e) => setNewPhoneNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <PhoneNumberList entries={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
}

export default App;
