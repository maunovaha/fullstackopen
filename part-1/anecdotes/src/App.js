import { useState } from 'react';

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [selected, setSelected] = useState(0);
  const mostVoted = points.indexOf(Math.max(...points));

  const handleVote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  }

  const handleNextAnecdote = () => {
    setSelected(randomNumber(anecdotes.length));
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>:: has {points[selected]} votes ::</div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVoted]}</div>
      <div>:: has {points[mostVoted]} votes ::</div>
    </>
  );
}

export default App;
