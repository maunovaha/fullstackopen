import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_PHONE_NUMBER } from '../queries'

const ChangePhoneNumberForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [changePhoneNumber, result] = useMutation(EDIT_PHONE_NUMBER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    changePhoneNumber({ variables: { name, phone } });
    setName('');
    setPhone('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Person not found');
    }
  }, [result.data]); // Runs effect every time when the value of `result.data` changes

  return (
    <div>
      <h2>Change phone number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone <input type="tel" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <input type="submit" value="Change number" />
      </form>
    </div>
  )
}

export default ChangePhoneNumberForm;