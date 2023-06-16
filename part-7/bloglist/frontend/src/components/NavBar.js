import { useSelector } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const NavBar = () => {
  const user = useSelector(state => state.login);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      {user && (
        <p>
          Logged in as {user.name} (
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
          )
        </p>
      )}
    </>
  );
};

export default NavBar;
