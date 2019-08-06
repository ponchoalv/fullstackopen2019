import React from 'react';
import { voteUp } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { notify } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const vote = (message, id) => {
    const notification = `you voted '${message}'`;
    store.dispatch(voteUp(id));
    notify(notification, store);
  };

  const filter = store.getState().filter;
  const filteredAnecdotes = store
    .getState()
    .anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    );

  return (
    <>
      {filteredAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote.content, anecdote.id)}
        />
      ))}
    </>
  );
};

export default AnecdoteList;
