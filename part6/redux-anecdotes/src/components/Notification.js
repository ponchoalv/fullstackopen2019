import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  
  return props.notification.show ? (
    <div style={style}>{props.notification.message}</div>
  ) : (
    <div />
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification);
