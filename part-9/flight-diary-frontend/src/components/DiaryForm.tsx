import { useState, SyntheticEvent } from 'react';
import diaryService, { isFailedRequest } from '../services/diaryService';
import Notification from './Notification';
import { Visibility, Weather } from '../types';

interface DiaryFormProps {
  onDiaryAdded: () => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = await diaryService.addDiary({ date, visibility, weather, comment });
    if (!isFailedRequest(data)) {
      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
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
          <input type="date" id="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Select the visibility:</legend>
          {Object.values(Visibility).map((value: string) => (
            <div key={value}>
              <input
                type="radio"
                name="visibility"
                id={value}
                value={value}
                onChange={e => setVisibility(e.target.value as Visibility)}
                checked={visibility === value}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </fieldset>
        <fieldset style={{ marginBottom: '1rem' }}>
          <legend>Select the weather:</legend>
          {Object.values(Weather).map((value: string) => (
            <div key={value}>
              <input
                type="radio"
                name="weather"
                id={value}
                value={value}
                onChange={e => setWeather(e.target.value as Weather)}
                checked={weather === value}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </fieldset>
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
