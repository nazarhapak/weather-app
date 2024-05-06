import React from 'react'
import "./Humidity.css"
import image from "../images/widget-icons/humidity.png";

const Humidity = ({humidity, temp}) => {
  const dew_point = () => {
    const a = 17.625;
    const  b = 243.04;
    const l = (Math.log(humidity / 100) + (a * temp / (b + temp)));
    return Math.round((b * l) / (a - l));
  }

  return (
    <div className='humidity'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          HUMIDITY
        </p>
        <p className='percentage'>{humidity}%</p>
        <p className='description'>The dew point is {dew_point()}° right now.</p>
    </div>
  )
}

export default Humidity;