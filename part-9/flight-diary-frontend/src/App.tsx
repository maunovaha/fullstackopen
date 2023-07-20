import { useState, useEffect } from 'react';
import diaryService from './services/diaryService';
import { Diary } from './types';
import DiaryList from './components/DiaryList';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAllDiaries();
      setDiaries(diaries);
      setLoading(false);
    };
    fetchDiaries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <DiaryList diaries={diaries} />
    </>
  );
};

export default App;
