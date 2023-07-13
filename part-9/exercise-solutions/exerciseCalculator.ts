interface UserInput {
  target: number;
  dailyExerciseHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseRating {
  rating: number;
  ratingDescription: string;
}

const parseUserInput = (args: string[]): UserInput => {
  if (args.length < 4 || args.length > 10) {
    throw new Error('Run the program using `npm run calculate-exercises <target> <daily-exercise-hours>`');
  }

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(exerciseHour => Number(exerciseHour));

  if (isNaN(target) || dailyExerciseHours.some(exerciseHour => isNaN(exerciseHour))) {
    throw new Error('At least one of the provided values were not numbers!');
  }

  return { target, dailyExerciseHours };
};

const calculateRating = (average: number, target: number): ExerciseRating => {
  if (average < 1) {
    return { rating: 1, ratingDescription: 'you are the worst' };
  } else if (average >= 1 && average < 2.5) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  } else {
    return { rating: 3, ratingDescription: 'excellent' };
  }
};

const calculateExercises = (target: number, dailyExerciseHours: number[]): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(exerciseHours => exerciseHours !== 0).length;
  const totalExerciseHours = dailyExerciseHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const average = totalExerciseHours / periodLength;
  const success = average >= target;
  const { rating, ratingDescription } = calculateRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, dailyExerciseHours } = parseUserInput(process.argv);
  console.log(calculateExercises(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMsg = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}
