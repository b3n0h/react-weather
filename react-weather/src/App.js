import React, { useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState({})
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submitInput = (event) => {
    setUserInput(event.target.value)
  }

  async function getWeather(event) {
    try {
      event.preventDefault()
      setIsLoading(true)

      const response = await fetch(`http://api.weatherstack.com/current?access_key=fd78f02b210d049f7680e8087b7d72e0&query=${userInput}&units=f`)
      const data = await response.json()

      const weatherData = {
        locationName: data.location.name,
        locationState: data.location.region,
        locationTemp: data.current.temperature,
      }
      console.log(data)
      setWeather(weatherData)
      setUserInput('')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const cool = weather.locationTemp <= 76 ? 'container cool' : 'container'
  const warm = weather.locationTemp >= 77 ? 'container warm' : 'container'
  const hot = weather.locationTemp >= 90 ? 'container hot' : 'container'

  return (
    <div className={`container ${cool} ${warm} ${hot}`}>
      <h1>Get Weather</h1>
      <div>
        <form onSubmit={getWeather}>
          <input type="text" onChange={submitInput} value={userInput} placeholder='Please enter a city name' />
          <button>Get Weather</button>
        </form>
      </div>
      <div className='forecast'>
        {
          !isLoading && Object.keys(weather).length !== 0 &&
          <p>The weather in {weather.locationName}, {weather.locationState} is currently {weather.locationTemp}°</p>
        }
        {isLoading && <p>Fetching weather...</p>}
      </div>
    </div>
  );
}

export default App;
