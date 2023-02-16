import CountryInformation from './CountryInformation';
import CountryList from './CountryList';

const CountrySearchResult = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, try to use more accurate keyword.</p>
    );
  } else if (countries.length === 1) {
    return (
      <CountryInformation country={countries[0]} />
    );
  } else {
    return (
      <>
        <p>Showing <b>{countries.length}</b> search results for the current keyword.</p>
        <CountryList countries={countries} onShow={onShow} />
      </>
    );
  }
}

export default CountrySearchResult;