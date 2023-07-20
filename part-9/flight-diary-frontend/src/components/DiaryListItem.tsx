import { Diary } from '../types';

interface DiaryListItemProps {
  diary: Diary;
}

const DiaryListItem = (props: DiaryListItemProps) => {
  return (
    <div>
      <p><b>{props.diary.date}</b></p>
      <ul>
        <li>Weather: {props.diary.weather}</li>
        <li>Visibility: {props.diary.visibility}</li>
      </ul>
    </div>
  );
};

export default DiaryListItem;
