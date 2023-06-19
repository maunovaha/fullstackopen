import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === id);

  if (!user) {
    return <Navigate replace to="/404" />;
  }

  return (
    <>
      <h2>Arto Hellas</h2>
      <p><strong>Added blogs</strong></p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserProfilePage;
