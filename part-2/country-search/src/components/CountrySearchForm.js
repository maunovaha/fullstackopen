const CountrySearchForm = ({ keyword, onSearch }) => {
  return (
    <form>
      <label htmlFor="keyword" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Search country:</label>
      <input type="text" value={keyword} onChange={onSearch} id="keyword" style={{ width: '100%', maxWidth: '240px', padding: '0.5rem' }}/>
    </form>
  );
}

export default CountrySearchForm;