import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import loginService from './services/LoginService';
import { logout, setUser } from './reducers/userReducer';
import { initBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      dispatch(setUser(JSON.parse(loggedUser)));
    }

    dispatch(initBlogs());
  }, []);

  return (
    <div>
      {!user && <LoginForm />}
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
            <BlogForm />
          </Toggleable>
          <BlogList />
        </>
      )}
    </div>
  );
};

export default App;
