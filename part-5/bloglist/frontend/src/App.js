import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import loginService from './services/LoginService';
import blogService from './services/BlogService';

const logout = () => {
  window.localStorage.removeItem('loggedUser');
  window.location.reload();
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    const response = await loginService.login(username, password);

    if (response.status === 200) {
      setAlert('');
      setUser(response.user);
      window.localStorage.setItem('loggedUser', JSON.stringify(response.user));
    } else if (response.status === 401) {
      setAlert('Invalid username or password.');
    } else {
      setAlert('Internal server error, try again later.');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  const handleCreateBlog = async (title, author, url) => {
    const response = await blogService.create(title, author, url, user.token);

    if (response.status === 201) {
      setAlert(`A new blog "${response.blog.title}" added!`);
      setBlogs(blogs.concat(response.blog));
    } else if (response.status === 400) {
      setAlert('Creating blog failed, did you forget to provide title and url?');
    } else if (response.status === 401) {
      logout();
    } else {
      setAlert('Internal server error, try again later.');
    }
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    const setupBlogs = async () => {
      const response = await blogService.getAll();

      if (response.status === 200) {
        setBlogs(response.blogs);
      } else {
        setAlert('Internal server error, try again later.');
      }
    };
    setupBlogs();
  }, []);

  return (
    <div>
      {!user && <LoginForm alert={alert} onLogin={handleLogin} />}
      {user && 
        <>
          <p>Logged in as {user.name} (<a href="#" onClick={handleLogout}>Logout</a>)</p>
          <Toggleable buttonLabel='New blog'>
            <BlogForm alert={alert} onCreateBlog={handleCreateBlog} />
          </Toggleable>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  );
};

export default App;