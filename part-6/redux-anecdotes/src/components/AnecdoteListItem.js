const AnecdoteListItem = ({ content, votes, onClick }) => {
  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={onClick}>vote</button>
      </div>
    </div>
  );
};

export default AnecdoteListItem;

