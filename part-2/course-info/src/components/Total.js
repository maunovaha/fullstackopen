const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p><b>Number of exercises {totalExercises}</b></p>
  );
}

export default Total;