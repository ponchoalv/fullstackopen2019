const initialState = {
  message: '',
  show: false
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        message: action.message,
        show: true
      };
    case 'REMOVE':
      return initialState;
    default:
      return state;
  }
};

const notifyAction = message => {
  return {
    type: 'NOTIFY',
    message
  };
};

const removeNotification = () => {
  return {
    type: 'REMOVE'
  };
};

export const notify = (message, dispatch) => {
  dispatch(notifyAction(message));
  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
};

export default notificationReducer;
