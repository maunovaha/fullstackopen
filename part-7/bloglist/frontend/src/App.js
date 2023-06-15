import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import loginService from './services/LoginService';
import { useDispatch } from 'react-redux';
import { initBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

const logout = () => {
  window.localStorage.removeItem('loggedUser');
  window.location.reload();
};

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    const response = await loginService.login(username, password);

    if (response.status === 200) {
      dispatch(setNotification(''));
      setUser(response.user);
      window.localStorage.setItem('loggedUser', JSON.stringify(response.user));
    } else if (response.status === 401) {
      dispatch(setNotification('Invalid username or password.'));
    } else {
      dispatch(setNotification('Internal server error, try again later.'));
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  return (
    <div>
      {!user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <>
          <p>
            Logged in as {user.name} (
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
            )
          </p>
          <Toggleable buttonLabel="New blog">
            <BlogForm user={user} />
          </Toggleable>
          <BlogList user={user} />
        </>
      )}
    </div>
  );
};

export default App;
