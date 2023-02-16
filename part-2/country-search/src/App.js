import { useState, useEffect } from 'react';
import CountrySearchForm from './components/CountrySearchForm';
import CountrySearchResult from './components/CountrySearchResult';
import axios from 'axios';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchCountry = (e) => {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    const search = async () => {
      try {
        const searchedCountry = keyword.trim();
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searchedCountry}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
        setSearchResults([]);
      }
    }
    // TODO: Using some sort of debounce -strategy would be beneficial so that we don't query API's on every key press
    search();
  }, [keyword])

  return (
    <div>
      <h1>Browse countries</h1>
      <CountrySearchForm keyword={keyword} onSearch={searchCountry} />
      <CountrySearchResult countries={searchResults} onShow={(country) => setKeyword(country)} />
    </div>
  );
}

export default App;
