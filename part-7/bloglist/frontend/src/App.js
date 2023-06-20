import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './reducers/loginReducer';
import BlogPage from './components/pages/BlogPage';
import BlogListPage from './components/pages/BlogListPage';
import UserListPage from './components/pages/UserListPage';
import UserProfilePage from './components/pages/UserProfilePage';
import LoginPage from './components/pages/LoginPage';
import NoMatchPage from './components/pages/NoMatchPage';
import NavBar from './components/NavBar';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.login);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      dispatch(setLoggedInUser(JSON.parse(loggedUser)));
    }

    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={user ? <BlogListPage /> : <Navigate replace to="/login" />} />
        <Route path="/blogs" element={user ? <BlogListPage /> : <Navigate replace to="/login" />} />
        <Route path="/blogs/:id" element={user ? <BlogPage /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={user ? <UserListPage /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={user ? <UserProfilePage /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <LoginPage />} />
        <Route path="*" element={user ? <NoMatchPage /> : <Navigate replace to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
