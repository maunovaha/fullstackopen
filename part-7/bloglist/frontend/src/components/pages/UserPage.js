import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initUsers } from '../../reducers/userReducer';
import UserList from '../UserList';

const UserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  return (
    <UserList />
  );
};

export default UserPage;
