interface UserInput {
  height: number;
  weight: number;
}

const parseUserInput = (args: string[]): UserInput => {
  if (args.length !== 4) {
    throw new Error('Run the program using `npm run calculate-bmi <height> <weight>`');
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('At least one of the provided values were not numbers!');
  }

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height / height) * 10000;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Healthy';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { height, weight } = parseUserInput(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMsg = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}
