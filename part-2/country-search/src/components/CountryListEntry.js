const CountryListEntry = ({ name, onShow }) => {
  return (
    <tr>
      <td>- {name}</td>
      <td>
        <button onClick={onShow}>Show</button>
      </td>
    </tr>
  );
}

export default CountryListEntry;