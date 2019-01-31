import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, handleChange}) =>
  <div>
    rajaa näytettäviä
    <input 
      value={filter} 
      onChange={handleChange}
    />
  </div>

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) =>
  <form onSubmit={addPerson}>
    <div>
      nimi: 
      <input 
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      numero:
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>

const Person = ({person}) => 
  <span>{person.name} {person.number} <br/></span>

const Persons = ({persons, filter}) =>
  <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map((person) => <Person key={person.name} person={person} />)}
  </div>

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} on jo luettelossa`)
    }
    else {
      const personObject = { name: newName, number: newNumber }
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          })
    }
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>lisää uusi</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App