import { useSelector } from 'react-redux';
import UserListItem from './UserListItem';

const UserList = () => {
  const users = useSelector(state => state.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
