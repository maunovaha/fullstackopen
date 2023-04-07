// "Presentantional component" as it only renders content and provides the click handler (no logic of its own)
const NoteListItem = ({ note, onClick }) => {
  return (
    <li onClick={onClick}>
      {note.content}
      <strong>{note.important ? 'important' : ''}</strong>
    </li>
  );
};

export default NoteListItem;
