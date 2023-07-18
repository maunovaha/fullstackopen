import { NewDiaryEntry, Visibility, Weather } from "./types";

const parseDate = (date: unknown): string => {
  // Notice that the `!isString(date)` needs to be called first, so that the
  // `date` is narrowed to `string` type that gets passed to `!isDate(date)`
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error(`Incorrect or missing weather: ${weather}`);
  }
  return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error(`Incorrect or missing visibility: ${visibility}`);
  }
  return visibility;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error(`Incorrect or missing comment: ${comment}`);
  }
  return comment;
};

// Because we are defining type guard using `text is string` the type is narrowed
// so the line `return comment` wont throw a compiler error.
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (weather: string): weather is Weather => {
  return Object.values(Weather).map(value => value.toString()).includes(weather);
};

const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility).map(value => value.toString()).includes(visibility);
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment)
    };
    return newEntry;
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

export default toNewDiaryEntry;
