export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewDiary extends Omit<Diary, 'id'> {
  comment: string;
}
