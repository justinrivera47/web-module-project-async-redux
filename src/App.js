import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import API from "./API";


function App() {

  const initialState = {
      q: 'London,uk',
      lat: '0',
      lon: '0',
      id: '2172797',
      lang: 'null',
      units: 'imperial',
  }

  const data = {
    name: '',
    id: '',
    timezone: 0,
    weather: [],
    main: []
  }
  const [display, setDisplay] = useState(data)

  const options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: initialState,
    headers: {
      'X-RapidAPI-Key': API,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
  useEffect(() => {
  axios.request(options).then(function (response) {
    console.log(response.data);
    setDisplay({
      ...display,
      name: response.data.name,
      id: response.data.id,
      timezone: response.data.timezone,
      weather: response.data.weather,
      main: response.data.main
    })
  }).catch(function (error) {
    console.error(error);
  }), []});

  return (
    <div className="App">
      <h1>Weather App</h1>
    <h2>{initialState.name}</h2>
    <p>{display.name}</p>
    <p>Timezone: {display.timezone}</p>
    {
      display.weather.map(weather => {
        return <li key={weather.id}>{weather.main}, {weather.description} <span>{weather.icon}</span></li>
      })
    }
    </div>
  );
}

export default App;