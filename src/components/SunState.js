import React from 'react'
import "./SunState.css"

const SunState = ({sunrise, sunset, time}) => {
  let sunrise_minutes;
  if (sunrise) {sunrise_minutes = Number(sunrise.split(":")[0] * 60 + sunrise.split(":")[1])};
  let sunset_minutes;
  if (sunset) {sunset_minutes = Number(sunset.split(":")[0] * 60 + sunset.split(":")[1])}
  const current_minutes = Number(time.split(":")[0] * 60 + time.split(":")[1]);

  const nightTime = () => {
    if ((sunset_minutes <= current_minutes) || (0 <= current_minutes && current_minutes < sunrise_minutes)) {
      return true;
    } else {
      return false;
    }
  }

  const dayTime = () => {
    if (sunrise_minutes <= current_minutes && current_minutes < sunset_minutes){
      return true;
    } else {
      return false;
    }
  }

  const getSunState = () => {
    if (nightTime()) {
      const image = require("../images/widget-icons/sunrise.png");
      return (
        <>
          <p className='widget-name'>
            <img alt="sunrise" src={image} className='widget-icon' style={{width: "12px"}}></img>
            SUNRISE
          </p>
          <p className='time'>{sunrise}</p>
          <p className='description'>Sunset: {sunset}</p>
        </>
      );
    } else if (dayTime()){
      const image = require("../images/widget-icons/sunset.png");
      return (
        <>
          <p className='widget-name'>
            <img alt="sunset" src={image} className='widget-icon' style={{width: "12px"}}></img>
            SUNSET
          </p>
          <p className='time'>{sunset}</p>
          <p className='description'>Sunrise: {sunrise}</p>
        </>
      );
    } else {
      const image = require("../images/widget-icons/sunrise.png");
      return (
        <>
          <p className='widget-name'>
            <img alt="sunrise" src={image} className='widget-icon' style={{width: "12px"}}></img>
            SUNRISE
          </p>
          <p className='time'>-</p>
          <p className='description'>No sunset today</p>
        </>
      );
    }
  }

  return (
    <div className='sun-state'>
      {getSunState()}
    </div>
  )
}

export default SunState;