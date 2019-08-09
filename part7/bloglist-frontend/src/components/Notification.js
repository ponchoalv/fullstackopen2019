import React from "react";
import { connect } from "react-redux";

const Notification = props => {
  if (!props.notification.show) {
    return null;
  }

  return (
    <div className={props.notification.notificationClassName}>
      {props.notification.message}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Notification);
