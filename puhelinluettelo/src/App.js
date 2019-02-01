import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({notification}) => {
  if (notification.message === null) {
    return null
  }

  const notificationStyle = {
    color: `${notification.color}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

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

const Person = ({person, removePerson}) => 
  <div>
      <span>{person.name} {person.number}</span>
      <button onClick={() => removePerson(person)}>poista</button>
  </div>

const Persons = ({persons, filter, removePerson}) =>
  <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map((person) => 
        <Person 
          key={person.id} 
          person={person} 
          persons={persons}
          removePerson={removePerson}
        />)}
  </div>

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotificaiton] = useState({message: null, color: 'green'})

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

  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const person = persons.find(person => person.name === newName)

    if (person !== undefined) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        updatePerson(person.id, personObject)
      }
    }
    else {
      addPerson(personObject)
    }
    
    setNewName('')
    setNewNumber('')
  }

  const notify = (message, color) => {
    setNotificaiton({message: message, color: color})
    setTimeout(() => setNotificaiton({message: null, color: 'green'}), 3000)
  }

  const removePerson = person => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .remove(person.id)
          .then(() => {setPersons(persons.filter(p => p.id !== person.id))})
          .then(() => notify(`Poistettiin ${person.name}`, 'green'))
    }
  }

  const addPerson = personObject =>
    personService
      .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(() => notify(`Lisättiin ${personObject.name}`, 'green'))

  const updatePerson = (id, personObject) =>
    personService
      .update(id, personObject)
        .then(returnedPerson =>
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson)))
        .then(() => 
          notify(`Päivitettiin seuraavan henkilön numero: ${personObject.name}`, 'green'))
        .catch(error => {
          notify(`Henkilö ${personObject.name} on jo poistettu`, 'red')
          setPersons(persons.filter(p => p.name !== personObject.name))
        })

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification notification={notification} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>lisää uusi</h2>
      <PersonForm
        addPerson={addOrUpdatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App