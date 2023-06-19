import { useSelector } from 'react-redux';
import UserList from '../UserList';

const UserListPage = () => {
  const users = useSelector(state => state.users);

  return (
    <>
      <h2>Users</h2>
      <UserList users={users} />
    </>
  );
};

export default UserListPage;
