import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './reducers/loginReducer';
import { initUsers } from './reducers/userReducer';
import BlogListPage from './components/pages/BlogListPage';
import UserListPage from './components/pages/UserListPage';
import UserProfilePage from './components/pages/UserProfilePage';
import LoginPage from './components/pages/LoginPage';
import NoMatchPage from './components/pages/NoMatchPage';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      dispatch(setLoggedInUser(JSON.parse(loggedUser)));
      // I have a feeling that this is not the best place to load users; E.g. we should only
      // load users to redux when we actually need them? Because now the initial load takes
      // more time as we need to query users before displaying them? In any case, we load the
      // users here as the `UserListPage` and `UserProfilePage` needs the data.
      dispatch(initUsers());
    }
    // Based on the docs, `dispatch` should be 100% synchronous operation, so setting loading
    // state here to `false` should work as expected(?)
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={user ? <BlogListPage /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={user ? <UserListPage /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={user ? <UserProfilePage /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginPage />} />
        <Route path="*" element={user ? <NoMatchPage /> : <Navigate replace to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
