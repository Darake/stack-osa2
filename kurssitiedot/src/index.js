import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) =>
  <h1>{text}</h1>

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = ({name, exercises}) =>
  <p>{name} {exercises}</p>

const Content = ({parts}) => {
  const rows = () => parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} />)
  
  return (
    <div>
      {rows()}
      <Total parts={parts} />
    </div>
  )
}

const Course = ({course}) => (
  <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
  </div>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  const courseContents = () => courses.map(course =>
    <Course key={course.id} course={course} />)

  return (
    <div>
      <Header text='Opetusohjelma' />
      {courseContents()}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)