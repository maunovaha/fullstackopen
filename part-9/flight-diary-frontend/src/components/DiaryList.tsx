import { Diary } from '../types';
import DiaryListItem from './DiaryListItem';

interface DiaryListProps {
  diaries: Diary[];
}

const DiaryList = (props: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaries.map((diary: Diary) => <DiaryListItem key={diary.id} diary={diary} />)}
    </div>
  );
};

export default DiaryList;
