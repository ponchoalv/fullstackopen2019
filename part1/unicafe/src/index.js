import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({label, handleClick}) => (
  <button onClick={handleClick}>{label}</button>
)

const Stat = ({label, quantity}) => (
  <p>{label + ' ' + quantity}</p>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button label='good' handleClick={incrementGood}/>
      <Button label='neutral' handleClick={incrementNeutral}/>
      <Button label='bad' handleClick={incrementBad}/>
      <h1>statics</h1>
      <Stat label='good' quantity={good}/>
      <Stat label='neutral' quantity={neutral}/>
      <Stat label='bad' quantity={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)