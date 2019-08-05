import React from 'react';
import { voteUp } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = ({ store }) => (
  <>
    {store.getState().map(anecdote => (
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => store.dispatch(voteUp(anecdote.id))}
      />
    ))}
  </>
);

export default AnecdoteList;
