import { useState } from 'react'

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" value={good} />
        <StatisticsLine text="Neutral" value={neutral} />
        <StatisticsLine text="Bad" value={bad} />
        <StatisticsLine text="All" value={all} />
        <StatisticsLine text="Average" value={average} />
        <StatisticsLine text="Positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
