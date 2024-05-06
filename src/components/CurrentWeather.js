import React from 'react'
import './CurrentWeather.css'

const CurrentWeather = ({name, weather, temp, temp_max, temp_min}) => {
  return (
    <div>
      <div className='current-weather'>
          <h2 className='city-name'>{name}</h2>
          <p className='temperature'>{temp}°</p>
          <p className='weather'>{weather.main}</p>
          <p className='highest-lowest'>H:{temp_max}° L:{temp_min}°</p>
      </div>
    </div>
  )
}

export default CurrentWeather;