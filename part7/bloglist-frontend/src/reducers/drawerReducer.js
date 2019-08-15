const initialState = {
  open: false,
  title: '',
  width: 240
}

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'OPEN':
    return { ...state, open: true }
  case 'CLOSE':
    return { ...state, open: false }
  case 'SET_TITLE':
    return { ...state, title: action.title }
  default:
    return state
  }
}

export const openDrawer = () => {
  return {
    type: 'OPEN'
  }
}

export const closeDrawer = () => {
  return {
    type: 'CLOSE'
  }
}

export const setTitle = title => {
  return {
    type: 'SET_TITLE',
    title
  }
}

export default drawerReducer
