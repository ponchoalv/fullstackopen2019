import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const ShowAnecdote = ({anecdote, votes}) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const App = props => {
  const anecdotesLength = props.anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotesLength).fill(0, 0, anecdotesLength)
  );

  const selectedAnecdote = props.anecdotes[selected];
  const selectedVotes = votes[selected];

  const anedoteKeyMostVoted = votes.indexOf(Math.max.apply(null, votes))
  const anedotetMostVoted = props.anecdotes[anedoteKeyMostVoted];
  const mostVotes = votes[anedoteKeyMostVoted];

  const vote = selected => () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const randomNumberSelected = () =>
    setSelected(Math.floor(Math.random() * anecdotesLength));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <ShowAnecdote anecdote={selectedAnecdote} votes={selectedVotes} />
      <Button handleClick={vote(selected)} text="vote" />
      <Button handleClick={randomNumberSelected} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <ShowAnecdote anecdote={anedotetMostVoted} votes={mostVotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
