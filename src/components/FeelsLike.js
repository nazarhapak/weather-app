import React from 'react'
import "./FeelsLike.css"
import image from "../images/widget-icons/feels-like.png";

const FeelsLike = ({feels_like, temp}) => {
  const getDescription =() => {
    if (feels_like === temp) {
      return "Similar to the actual temperature.";
    } else if (feels_like > temp) {
      return "Humidity is making it feel warmer."
    } else if (feels_like < temp) {
      return "Wind is making it feel cooler."
    } else {
      return "-";
    }
  }

  return (
    <div className='feels-like'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          FEELS LIKE
        </p>
        <p className='temperature'>{feels_like}°</p>
        <p className='description'>{getDescription()}</p>
    </div>
  )
}

export default FeelsLike;