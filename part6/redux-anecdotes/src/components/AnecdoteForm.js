import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = props => {
  const submitNewAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.newAnecdote(anecdote);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submitNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    newAnecdote: async anecdote => {
      const createdAnecdote = await anecdoteService.createNew(anecdote);
      dispatch(newAnecdote(createdAnecdote));
      const notifyMessage = `you created '${anecdote}'`;
      notify(notifyMessage, dispatch);
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
