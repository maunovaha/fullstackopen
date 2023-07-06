import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [signIn] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <h2>Login to app</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default LoginForm;
