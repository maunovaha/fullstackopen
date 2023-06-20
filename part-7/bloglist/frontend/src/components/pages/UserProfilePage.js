import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { initUsers } from '../../reducers/userReducer';

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === id);

  // The fact that we need to fetch all users in order to view details of a single user
  // seems wrong. Usually we would fetch only single user information, but this works
  // for now, so lets go with this.
  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(initUsers());
      setLoading(false);
    };
    fetchUsers();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
