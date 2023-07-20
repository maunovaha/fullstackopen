interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  if (!props.message || props.message.length === 0) {
    return null;
  }
  return <p style={{ color: 'red' }}>{props.message}</p>
};

export default Notification;
