import { useSelector } from 'react-redux';

const Alert = () => {
  const notification = useSelector(state => state.notification);
  return <>{notification && <p>{notification}</p>}</>;
};

export default Alert;
