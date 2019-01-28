import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) =>
  <h1>{text}</h1>

const Total = props => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

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
  const course = {
    name: 'Half Stack -sovelluskehitys',
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
  } 

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)