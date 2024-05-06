import React from 'react'
import "./HourlyForecast.css"
import image from "../images/widget-icons/clock.png";

const HourlyForecast = ({forecast, sunrise, sunset, weather, temp, hour}) => {
  let sunrise_hour;
  if (sunrise) {sunrise_hour = +sunrise.split(":")[0]};

  let sunset_hour;
  if (sunset) {sunset_hour = +sunset.split(":")[0]}

  const getIconName = (weather, hour) => {
    const night = () => {
      if (sunset_hour <= hour || hour <= sunrise_hour || +hour === 0) {
        return true;
      } else {
        return false;
      }
    }

    switch (weather[0]) {
      case "Thunderstorm":
        return "thunder";
      case "Drizzle":
        if (night()) {
          return "drizzle-night";
        } else {
          return "drizzle";
        }
      case "Rain":
        switch (weather[1]) {
          case "heavy intensity rain" || 	"very heavy rain" || "extreme rain":
            return "heavy-rain";
          case "freezing rain":
            return "slush";
          case "light rain" || "moderate rain" || "light intensity shower rain" || "shower rain" || "heavy intensity shower rain" || "ragged shower rain":
            return "rain";
          default:
            return "rain";
        }
      case "Snow":
        switch (weather[1]) {
          case "heavy shower snow" || "heavy snow":
            return "heavy-snow";
          case "sleet" || "light shower sleet" || "shower sleet" || "light rain and snow" || "rain and snow":
            return "sleet";
          case "light snow" || "snow" || "light shower snow" || "shower snow":
            return "snow";
          default:
            return "snow";
        }
      case "Haze":
        return "haze";
      case "Clear":
        if (night()) {
          return "clear-night";
        } else {
          return "clear";
        }
      case "Clouds":
        switch (weather[1]) {
          case "few clouds" || "scattered clouds":
            if (night()) {
              return "sometimes-clouds-night"
            } else {
              return "sometimes-clouds";
            }
          case "broken clouds" || "	overcast clouds":
            return "clouds";
          default:
            return "clouds";
        }
      default: 
        if (weather[0] === "Mist" || weather[0] === "Fog" || weather[0] === "Smoke" || weather[0] === "Ash") {
          return "fog";
        }
        if (weather[0] === "Dust" || weather[0] === "Sand" || weather[0] === "Squall" || weather[0] === "Tornado") {
          return "windy";
        }
        return "clear";
    }

  }

  const current_conditions = () => {
    const current_weather = [weather.main, weather.description]
    const image_url = require(`../images/condition-icons/${getIconName(current_weather, hour)}.png`);

    const sunrise_time = () => {
      if (sunrise_hour >= hour && sunrise_hour < +hour+3) {
        return true;
      } else {
        return false;
      }
    }

    const sunset_time = () => {
      if (sunset_hour >= hour && sunset_hour < (forecast[0].hour - +hour) ){
        return true;
      } else {
        return false;
      }
    }

    const sun_state = () => {
      if (sunrise_time()) {
        const image = require(`../images/condition-icons/sunrise.png`)
        return (
          <div className='condition-section'>
            <p>{sunrise}</p>
            <img alt={"sunrise"} src={image} className='sun-state-icon'></img>
            <p className='sun-state'>Sunrise</p>
          </div>
        )
      } else if (sunset_time()) {
        const image = require(`../images/condition-icons/sunset.png`)
        return (
          <div className='condition-section'>
            <p>{sunset}</p>
            <img alt={"sunset"} src={image} className='sun-state-icon'></img>
            <p className='sun-state'>Sunset</p>
          </div>
        )
      } else {
        return null;
      }
    }

    return (
      <>
        <div className='condition-section'>
          <p>Now</p>
            <img alt={weather[1]} src={image_url} className='condition-icon'></img>
          <p className='temperature'>{temp}°</p>
        </div>
        {sun_state()}
      </>
    )
  }
  
  const conditions = forecast.slice(0, forecast.length).map((prediction, key) => {
    const {hour, weather, temperature, rain} = prediction;
    const image_url = require(`../images/condition-icons/${getIconName(weather, hour)}.png`)

    const sunrise_time = () => {
      if (sunrise_hour >= hour && sunrise_hour < +hour+3) {
        return true;
      } else {
        return false;
      }
    }

    const sunset_time = () => {
      if (sunset_hour >= hour && sunset_hour < +hour+3) {
        return true;
      } else {
        return false;
      }
    }

    const sun_state = () => {
      if (sunrise_time()) {
        const image = require(`../images/condition-icons/sunrise.png`)
        return (
          <div className='condition-section'>
            <p>{sunrise}</p>
            <img alt={"sunrise"} src={image} className='sun-state-icon'></img>
            <p className='sun-state'>Sunrise</p>
          </div>
        )
      } else if (sunset_time()) {
        const image = require(`../images/condition-icons/sunset.png`)
        return (
          <div className='condition-section'>
            <p>{sunset}</p>
            <img alt={"sunset"} src={image} className='sun-state-icon'></img>
            <p className='sun-state'>Sunset</p>
          </div>
        )
      } else {
        return null;
      }
    }

    const getImage = () => {
      if (rain) {
        return ( 
          <div className='precipitation-image'>
            <img alt={weather[1]} src={image_url} className='condition-icon'></img>
            <p className='precipitation'>{rain}</p> 
          </div>
        )
      } else {
        return <img alt={weather[1]} src={image_url} className='condition-icon'></img>;
      }
    }

    return (
      <React.Fragment  key={key}>
        <div className='condition-section'>
          <p>{hour}</p>
          {getImage()}
          <p className='temperature'>{temperature}°</p>
        </div>
        {sun_state()}
      </React.Fragment>
    )
  })

  return (
    <div className='hourly-forecast'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          3-HOURLY FORECAST
        </p>
        <hr></hr>
        <div className='conditions'>
          <div className='condition-sections-grid'>
            {current_conditions()}
            {conditions}
          </div>
        </div>
    </div>
  )
}

export default HourlyForecast;