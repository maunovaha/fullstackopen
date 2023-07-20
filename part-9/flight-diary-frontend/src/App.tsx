import { useState, useEffect } from 'react';
import diaryService, { isFailedRequest } from './services/diaryService';
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
      const data = await diaryService.getAllDiaries();
      if (!isFailedRequest(data)) {
        setDiaries(data);
      }
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
