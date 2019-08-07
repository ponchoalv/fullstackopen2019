import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';


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

const mapDispatchToProps = dispatch =>  {
  return {
    newAnecdote: (anecdote) => {
      dispatch(newAnecdote(anecdote));
      dispatch(notify(`you created '${anecdote}'`, 1));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
