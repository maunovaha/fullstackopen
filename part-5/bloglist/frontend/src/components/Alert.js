const Alert = ({ text }) => {
  return (
    <>
      {text && <p>{text}</p>}
    </>
  );
};

export default Alert;