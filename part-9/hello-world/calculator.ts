// How to run: `npm run calculator`

type Operation = 'multiply' | 'add' | 'divide';

const calculator = (a: number, b: number, operation: Operation): number => {
  switch (operation) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) {
        throw new Error('Can\'t divide by zero!');
      }
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
};

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMsg = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.log(errorMsg);
}

calculator(2, 4, 'multiply');

// Prints out the current command-line arguments
console.log(process.argv);
