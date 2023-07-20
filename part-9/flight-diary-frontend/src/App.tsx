import { useState, useEffect } from 'react';
import diaryService from './services/diaryService';
import { Diary } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [diaryAdded, setDiaryAdded] = useState(false);

  const handleDiaryAdded = () => {
    setDiaryAdded(prev => !prev);
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();
      setDiaries(diaries);
      setLoading(false);
    };
    fetchDiaries();
  }, [diaryAdded]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DiaryForm onDiaryAdded={handleDiaryAdded} />
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
