export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export interface NewDiary extends Omit<Diary, 'id'> {
  comment: string;
}
