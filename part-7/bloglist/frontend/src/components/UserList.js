import UserListItem from './UserListItem';

const UserList = ({ users }) => {
  return (
    <>
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
