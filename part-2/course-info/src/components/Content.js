import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part name={part.name} count={part.exercises} key={part.id} />
      )}
    </div>
  );
}

export default Content;