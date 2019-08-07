import React from 'react';
import { connect } from 'react-redux';
import { voteUp } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { notify } from '../reducers/notificationReducer';

const AnecdoteList = props =>
  props.visibleAnecdotes.map(anecdote => (
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      handleVote={() => props.vote(anecdote.content, anecdote.id)}
    />
  ));

const filteredAnecdotes = ({ anecdotes, filter }) =>
  anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter));

const mapStateToProps = state => {
  return {
    visibleAnecdotes: filteredAnecdotes(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    vote: (message, id) => {
      const notification = `you voted '${message}'`;
      dispatch(voteUp(id));
      dispatch(notify(notification, 5));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
