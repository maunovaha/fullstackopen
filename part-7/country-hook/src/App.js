import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const search = async () => {
      try {
        const searchedCountry = name.trim();
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searchedCountry}`);
        const countries = response.data;
        setCountry({ ...countries[0] }); // There can be multiple matches, so choosing only the first one
      } catch (error) {
        console.error(error);
        setCountry(null);
      }
    }
    search();
  }, [name]);

  return country;
};

const Country = ({ country, name }) => {
  if (!country && name.length === 0) {
    return null;
  }

  if (!country) {
    return (
      <div>
        <br />
        Not found...
      </div>
    );
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>Capital(s): {country.capital.join(', ')}</div>
      <div>Population: {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`Flag of ${country.name.common}`}/>
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <input type="submit" value="Find" />
      </form>

      <Country country={country} name={name} />
    </div>
  );
};

export default App;