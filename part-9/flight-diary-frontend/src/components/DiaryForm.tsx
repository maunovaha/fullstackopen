import { useState, SyntheticEvent } from 'react';
import diaryService, { isFailedRequest } from '../services/diaryService';
import Notification from './Notification';

interface DiaryFormProps {
  onDiaryAdded: () => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = await diaryService.addDiary({ date, visibility, weather, comment });
    if (!isFailedRequest(data)) {
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setErrorMessage('');
      props.onDiaryAdded();
    } else {
      setErrorMessage(data.errorMessage);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="date" style={{ display: 'block' }}>Date:</label>
          <input type="text" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="visibility" style={{ display: 'block' }}>Visibility:</label>
          <input type="text" id="visibility" name="visibility" value={visibility} onChange={e => setVisibility(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="weather" style={{ display: 'block' }}>Weather:</label>
          <input type="text" id="weather" name="weather" value={weather} onChange={e => setWeather(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="comment" style={{ display: 'block' }}>Comment:</label>
          <textarea id="comment" name="comment" value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <input type="submit" value="Add entry" />
      </form>
    </>
  );
};

export default DiaryForm;
