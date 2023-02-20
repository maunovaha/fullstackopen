import PhoneNumberListEntry from './PhoneNumberListEntry';

const PhoneNumberList = ({ entries, handleDelete }) => {
  return (
    <ul>
      {entries.map(entry => 
        <PhoneNumberListEntry 
          name={entry.name} 
          phoneNumber={entry.phoneNumber} 
          handleDelete={() => handleDelete(entry.id)}
          key={entry.id}
        />
      )}
    </ul>
  );
}

export default PhoneNumberList;