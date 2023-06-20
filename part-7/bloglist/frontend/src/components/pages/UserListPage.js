import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initUsers } from '../../reducers/userReducer';
import UserList from '../UserList';

const UserListPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

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

  return (
    <>
      <h2>Users</h2>
      <UserList users={users} />
    </>
  );
};

export default UserListPage;
