const PhoneNumberForm = ({ name, phoneNumber, handleSubmit, handleNameChange, handlePhoneNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default PhoneNumberForm;