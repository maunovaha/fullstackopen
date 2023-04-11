import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const NoteFilter = () => {
  const dispatch = useDispatch();

  return (
    <>
      <br />
      <div>
        <input type="radio" name="filter" id="all" onChange={() => dispatch(filterChange('ALL'))} />
        <label value="all">All</label>
      </div>
      <div>
        <input type="radio" name="filter" id="important" onChange={() => dispatch(filterChange('IMPORTANT'))} />
        <label value="all">Important</label>
      </div>
      <div>
        <input type="radio" name="filter" id="nonimportant" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
        <label value="all">Nonimportant</label>
      </div>
    </>
  );
};

export default NoteFilter;
