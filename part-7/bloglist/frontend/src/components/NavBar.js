import { useNavigate, Link } from 'react-router-dom';
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
    <div style={{ marginBottom: '1rem' }}>
      <Link to="/" style={{ display: 'inline-block', paddingRight: '0.5rem' }}>Blogs</Link>
      <Link to="/users" style={{ display: 'inline-block', paddingRight: '0.5rem' }}>Users</Link>
      <div style={{ display: 'inline-block' }}>
        Logged in as {user.name} (
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
        )
      </div>
    </div>
  );
};

export default NavBar;
