import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import loginService from './services/LoginService';
import blogService from './services/BlogService';

const logout = () => {
  window.localStorage.removeItem('loggedUser');
  window.location.reload();
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

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

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const response = await blogService.create(title, author, url, user.token);

    if (response.status === 201) {
      setAlert(`A new blog "${response.blog.title}" added!`);
      setTitle('');
      setAuthor('');
      setUrl('');
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
          <h1>Create new blog</h1>
          {alert && <p>{alert}</p>}
          <BlogForm
            title={title}
            author={author}
            url={url}
            onChangeTitle={setTitle}
            onChangeAuthor={setAuthor}
            onChangeUrl={setUrl}
            onSubmit={handleCreateBlog}
          />
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