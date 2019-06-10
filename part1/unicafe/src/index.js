import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({label, handleClick}) => (
  <button onClick={handleClick}>{label}</button>
)

const Statistic = ({label, quantity, percent=false}) => {
  if(percent){
    return (<p>{label + ' ' + quantity} %</p>)
  }
  return (<p>{label + ' ' + quantity}</p>)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if(total === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <>
    <Statistic label='good' quantity={good}/>
    <Statistic label='neutral' quantity={neutral}/>
    <Statistic label='bad' quantity={bad}/>
    <Statistic label='all' quantity={total}/>
    <Statistic label='average' quantity={average}/>
    <Statistic label='positive' quantity={positive} percent/>
    </>
  )

}

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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)