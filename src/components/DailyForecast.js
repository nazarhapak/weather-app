import React from 'react'
import "./DailyForecast.css"
import image from "../images/widget-icons/calendar.png";

const DailyForecast = ({forecast, weather, temp_min, temp_max}) => {

  const getIconName = (weather) => {

    switch (weather[0]) {
      case "Thunderstorm":
        return "thunder";
      case "Drizzle":
        return "drizzle";
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
        return "clear";
      case "Clouds":
        switch (weather[1]) {
          case "few clouds" || "scattered clouds":
            return "sometimes-clouds";
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
    const image_url = require(`../images/condition-icons/${getIconName(current_weather)}.png`);

    return (
      <div className='daily-condition-section'>
        <p>Today</p>
        <img alt={weather[1]} src={image_url} className='condition-icon'></img>
        <div className='highest-lowest'>
          <p className='temperature'>{temp_min}°</p>
          <hr className='scale'></hr>
          <p className='temperature'>{temp_max}°</p>
        </div>
      </div>
    )
  }

  const conditions = forecast.map(prediction => {
    const {weather, temp_max, temp_min, rain} = prediction;
    const image_url = require(`../images/condition-icons/${getIconName(weather)}.png`)

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

    let {weekday} = prediction;
    weekday = weekday[0].toUpperCase() + weekday.substring(1, 3);

    return (
      <div className='daily-condition-section'>
        <p>{weekday}</p>
        {getImage()}
        <div className='highest-lowest'>
          <p className='temperature'>{temp_min}°</p>
          <hr className='scale'></hr>
          <p className='temperature'>{temp_max}°</p>
        </div>
      </div>
    )
  })

  const organizeConditions = () => {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    let replace = [];
    conditions.slice(0, 3).forEach((condition, index) => {
      if (weekdays.slice(weekdays.indexOf(condition.props.children[0].props.children), weekdays.indexOf(conditions[(index + 1)].props.children[0].props.children)).length > 1) {
        replace = conditions.slice(0, (index + 1))
      }
    })
    
    conditions.push(replace);
    replace.forEach(element => conditions.shift())
  }

  organizeConditions()

  return (
    <div className='daily-forecast'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          5-DAY FORECAST
        </p>
        <div className='daily-conditions'>
          {current_conditions()}
          {conditions.slice(0, 4)}
        </div>
    </div>
  )
}

export default DailyForecast;