import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({current: '', icon: '', wind: '', direction: ''})
  useEffect(() => {
    axios
      .get('http://api.apixu.com/v1/current.json?key=f6691b18b3814d9f8bf142532193101&q='+capital)
      .then(response => {
        setWeather({
          current: response.data.current.temp_c,
          icon: response.data.current.condition.icon,
          wind: response.data.current.wind_kph,
          direction: response.data.current.wind_dir
        })
      })
  }, [])
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <b>temperature:</b> {weather.current} Celsius <br/>
        <img src={weather.icon} alt="Temp icon" /> <br/>
        <b>wind:</b> {weather.wind} kph direction {weather.direction}
      </p>
    </div>
  )
}

const Country = ({country, weather}) =>
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
    <Weather capital={country.capital} />
  </div>

const Countries = ({countries, filter, setFilter}) => {
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]}/>
  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map((country) => 
         <div key={country.name}>
          <span>{country.name}</span>
          <button onClick={() => setFilter(country.name)} >show</button>
        </div>)}
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
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App;
