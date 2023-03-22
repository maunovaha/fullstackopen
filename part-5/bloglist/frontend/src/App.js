import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import loginService from './services/LoginService';
import blogService from './services/BlogService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginService.login(username, password);

    if (response.status === 200) {
      setAlert('');
      setUser(response.user);
      window.localStorage.setItem('loggedUser', JSON.stringify(response.user));
    } else {
      setAlert('Invalid username or password.');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    const setupBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    setupBlogs();
  }, []);

  return (
    <div>
      {!user &&
        <>
          <h1>Login to application</h1>
          {alert && <p>{alert}</p>}
          <LoginForm 
            username={username}
            password={password}
            onChangeUsername={setUsername}
            onChangePassword={setPassword}
            onLogin={handleLogin}
          />
        </>
      }
      {user && 
        <>
          <p>Logged in as {user.name} (<a href="#" onClick={handleLogout}>Logout</a>)</p>
          <h1>Blogs</h1>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  );
};

export default App;