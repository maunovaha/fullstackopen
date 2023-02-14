import PhoneNumberListEntry from './PhoneNumberListEntry';

const PhoneNumberList = ({ entries }) => {
  return (
    <ul>
      {entries.map(entry => 
        <PhoneNumberListEntry name={entry.name} phoneNumber={entry.phoneNumber} key={entry.name} />
      )}
    </ul>
  );
}

export default PhoneNumberList;