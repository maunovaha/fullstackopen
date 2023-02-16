import CountryListEntry from './CountryListEntry';

const CountryList = ({ countries, onShow }) => {
  if (countries.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        {countries.map(country => 
          <CountryListEntry 
            name={country.name.common} 
            onShow={() => onShow(country.name.common)}
            key={country.name.common}
          />
        )}
      </tbody>
    </table>
  );
}

export default CountryList;