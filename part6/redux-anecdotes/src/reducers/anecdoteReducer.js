import anecdoteService from '../services/anecdotes';

const sortVotes = (firstEl, secondEl) => {
  return secondEl.votes - firstEl.votes;
};

export const voteUp = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.getById(id);
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(id, newAnecdote);
    dispatch({
      type:'VOTE_UP',
      updatedAnecdote
    })
  };
};

export const newAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: response
    })
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE_UP':
      const newState = state.map(anecdote =>
        anecdote.id !== action.updatedAnecdote.id ? anecdote : action.updatedAnecdote
      );
      return newState.sort(sortVotes);
    case 'NEW_ANECDOTE':
      return [...state, action.data].sort(sortVotes);
    case 'INIT_ANECDOTES':
      return action.data.sort(sortVotes);
    default:
      return state;
  }
};

export default reducer;
