const PhoneNumberListEntry = ({ name, phoneNumber, handleDelete }) => {
  return (
    <li>
      {name} {phoneNumber}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PhoneNumberListEntry;