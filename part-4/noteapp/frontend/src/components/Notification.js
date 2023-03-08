const Notification = ({ message }) => {
  if (message.length === 0) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );
}

export default Notification;