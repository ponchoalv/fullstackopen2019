const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_CHANGED':
      return action.filter;
    default:
      return state;
  }
};

export const changeFilter = filter => {
  return {
    type: 'FILTER_CHANGED',
    filter
  };
};

export default filterReducer;
