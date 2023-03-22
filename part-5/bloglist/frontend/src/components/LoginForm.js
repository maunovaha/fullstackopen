const LoginForm = ({ username, password, onChangeUsername, onChangePassword, onLogin }) => {
  return (
    <form onSubmit={onLogin}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username" style={{ display: 'block' }}>Username</label>
        <input type="text" name="username" id="username" value={username} onChange={(e) => onChangeUsername(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block' }}>Password</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => onChangePassword(e.target.value)} />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;