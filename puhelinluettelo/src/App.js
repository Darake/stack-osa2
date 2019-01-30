import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-123456' },
    { name: 'Matti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '041-413442' },
    { name: 'Tuomas Kyrölä', number: '09-210442' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      setPersons(persons.concat(personObject))
    }
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>
        rajaa näytettäviä
        <input
          value={filter} 
          onChange={handleFilterChange}
        />
      </div>
      <h2>lisää uusi</h2>
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
      <h2>Numerot</h2>
      {persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person, key) => 
          <span key={person.name}>
            {person.name} {person.number}<br/>
          </span>)}
    </div>
  )

}

export default App