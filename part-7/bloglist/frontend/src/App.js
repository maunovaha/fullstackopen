import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './reducers/loginReducer';
import BlogPage from './components/pages/BlogPage';
import UserPage from './components/pages/UserPage';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      dispatch(setLoggedInUser(JSON.parse(loggedUser)));
    }
  }, []);

  return (
    <>
      {user ? (
        <Router>
          <NavBar />
          <Routes>
            <Route path="/users" element={<UserPage />} />
            <Route path="/" element={<BlogPage />} />
          </Routes>
        </Router>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default App;
