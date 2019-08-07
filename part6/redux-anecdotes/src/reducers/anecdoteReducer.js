const asObject = anecdote => {
  return {
    content: anecdote,
  };
};

const sortVotes = (firstEl, secondEl) => {
  return secondEl.votes - firstEl.votes;
}

export const voteUp = id => {
  return {
    type: 'VOTE_UP',
    data: { id }
  };
};

export const newAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE_UP':
      const id = action.data.id;
      const anecdoteToChange = state.find(n => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };

      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );   
      return newState.sort(sortVotes);
    case 'NEW_ANECDOTE':
      const content = action.data.content;
      const newAnecdote = asObject(content);
      return [...state, newAnecdote];
    case 'INIT_ANECDOTES':
      return action.data.sort(sortVotes);
    default:
      return state;
  }
};

export default reducer;
