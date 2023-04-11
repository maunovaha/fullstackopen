import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="filter">Filter</label>
      <input type="text" name="filter" id="filter" onChange={({ target }) => dispatch(changeFilter(target.value))} />
    </div>
  );
};

export default AnecdoteFilter;
