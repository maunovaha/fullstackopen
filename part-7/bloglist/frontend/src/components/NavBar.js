import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
    // For some reason, we need to refresh the page as well after the logout,
    // otherwise the login page is not properly displayed?
    navigate(0);
  };

  return (
    <p>
      Logged in as {user.name} (
      <a href="#" onClick={handleLogout}>
        Logout
      </a>
      )
    </p>
  );
};

export default NavBar;
