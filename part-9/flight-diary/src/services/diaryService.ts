import diaryData from '../../data/entries.json';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

// Uses type assertion to fix compiler warning; Should be used only
// when we know what we are doing!
const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(diary => diary.id === id);
};

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  // Even though we have declared `NonSensitiveDiaryEntry` we still need to explicitly remove the
  // sensitive `comment` field from the returned array; The reason is that TS does not
  // modify the actual data but only it's type (TS sucks in this regard, false sense of security?).
  return diaries.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { comment, ...rest } = item;
    return rest;
  });
};

const addDiary = (diaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(diary => diary.id)) + 1,
    ...diaryEntry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  findById,
  getEntries,
  addDiary,
  getNonSensitiveEntries
};
