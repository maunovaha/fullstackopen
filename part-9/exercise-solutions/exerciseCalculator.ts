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

const calculateRating = (average: number, target: number): ExerciseRating => {
  if (average < 1) {
    return { rating: 1, ratingDescription: 'you are the worst' };
  } else if (average >= 1 && average < 2.5) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  } else {
    return { rating: 3, ratingDescription: 'excellent' };
  }
};

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
