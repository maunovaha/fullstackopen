import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername('');
    setPassword('');
  }

  return (
    <form onSubmit={login} style={{ marginBottom: '1rem' }}>
      <div>
        username
        <input 
          type="text" 
          value={username} 
          name="username" 
          onChange={(e => setUsername(e.target.value))}
        />
      </div>
      <div>
        password
        <input 
          type="password" 
          value={password} 
          name="password" 
          onChange={(e => setPassword(e.target.value))}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;