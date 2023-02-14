const PhoneNumberSearch = ({ keyword, handleSearch }) => {
  return (
    <div>
      Filter shown with: <input type="text" value={keyword} onChange={handleSearch} />
    </div>
  );
}

export default PhoneNumberSearch;