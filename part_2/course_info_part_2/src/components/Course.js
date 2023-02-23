const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises
  }, 0)
  return (
    <p><strong>Total of {sum} exercises</strong></p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>

  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course
