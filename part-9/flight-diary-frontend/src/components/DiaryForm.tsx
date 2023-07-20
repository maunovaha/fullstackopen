import { useState, SyntheticEvent } from 'react';
import diaryService from '../services/diaryService';

interface DiaryFormProps {
  onDiaryAdded: () => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await diaryService.addDiary({ date, visibility, weather, comment });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
    props.onDiaryAdded();
  };

  return (
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
  );
};

export default DiaryForm;
