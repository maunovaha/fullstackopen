import { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources([...response.data]);
  };

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  };

  useEffect(() => {
    getAll();
  }, []);

  const service = { getAll, create };

  return [resources, service];
};

const App = () => {
  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetName, ...name } = useField('text');
  const { reset: resetNumber, ...number } = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    noteService.create({ content: content.value });
    resetContent();
  };
 
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    personService.create({ name: name.value, number: number.value});
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <input type="submit" value="Create" />
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <input type="submit" value="Create" />
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  );
};

export default App;