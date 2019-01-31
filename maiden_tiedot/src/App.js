import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({country}) =>
  <div>
    <h1>{country.name}</h1>
    <p>
      capital {country.capital} <br/>
      population {country.population}
    </p>
    <h2>languages</h2>
    <ul>
      {country.languages.map((language) => 
        <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="Flag" height="150" width="200" />
  </div>

const Countries = ({countries, filter}) => {
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map((country) => 
          <span key={country.name}>{country.name} <br/></span>)}
      </div>
    )
  } else {
    return (<span>Too many matches, specify another filter</span>)
  }
}

const Filter = ({filter, handleChange}) => 
  <div>
    find countries
    <input 
      value={filter}
      onChange={handleChange}
    />
  </div>

const App = () => {
  const [countries, setContries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setContries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

export default App;
