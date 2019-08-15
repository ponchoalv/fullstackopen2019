const initialState = {
  message: '',
  show: false,
  notificationClassName: 'success'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return {
      message: action.message,
      show: true,
      notificationClassName: action.className
    }
  case 'REMOVE':
    return initialState
  default:
    return state
  }
}

const notifyAction = (message, className) => {
  return {
    type: 'NOTIFY',
    message,
    className
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export const notify = (message, className, seconds) => {
  return async dispatch => {
    dispatch(notifyAction(message, className))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationReducer
