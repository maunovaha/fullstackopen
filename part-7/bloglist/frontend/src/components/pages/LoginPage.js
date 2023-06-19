import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../reducers/loginReducer';
import Alert from '../Alert';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    navigate('/');
  };

  return (
    <>
      <h1>Login to application</h1>
      <Alert />
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block' }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginPage;
