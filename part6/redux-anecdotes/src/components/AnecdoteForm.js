import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteForm = props => {
  const submitNewAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.store.dispatch(newAnecdote(anecdote));
    const notifyMessage = `you created '${anecdote}'`;
    notify(notifyMessage, props.store)
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

export default AnecdoteForm;
