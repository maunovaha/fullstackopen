import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={login}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username" style={{ display: 'block' }}>Username</label>
        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block' }}>Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;