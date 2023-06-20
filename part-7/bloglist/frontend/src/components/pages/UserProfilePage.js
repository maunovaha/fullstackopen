import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === id);

  if (!user) {
    return <Navigate replace to="/404" />;
  }

  return (
    <>
      <h2>{user.name}</h2>
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
