import React from 'react'
import Header from './Header'

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

export default Course