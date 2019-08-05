import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = props => {
  const submitNewAnecdote = event => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.store.dispatch(newAnecdote(anecdote));
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
