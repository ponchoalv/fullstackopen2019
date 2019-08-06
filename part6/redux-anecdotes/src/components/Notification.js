import React from 'react';

const Notification = props => {
  const notification = props.store.getState().notification;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  
  return notification.show ? (
    <div style={style}>{props.store.getState().notification.message}</div>
  ) : (
    <div />
  );
};

export default Notification;
