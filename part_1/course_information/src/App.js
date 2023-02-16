const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = (props) => (
  <>
    {props.parts.map((part, index) => (
      <Part name={part.name} exercises={part.exercises} key={index} />
    ))}
  </>
)

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const totalSum = exercises.reduce((accumulator, value) => accumulator + value, 0)
  return (
    <p>Number of exercises {totalSum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
