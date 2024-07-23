import React, { Component } from "react";
import "./App.css";
import WelcomePage from "../components/WelcomePage";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import Map from "../components/Map";
import DailyForecast from "../components/DailyForecast";
import Wind from "../components/Wind";
import Humidity from "../components/Humidity";
import FeelsLike from "../components/FeelsLike";
import Visibility from "../components/Visibility";
import SunState from "../components/SunState";
import Background from "../components/Background";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "Welcome",
      name: "Enter city name",
      weather: {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n",
      },
      time: "00:00",
      hour: "00",
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
      feels_like: 0,
      visibility: 0,
      humidity: 0,
      hourly_forecast: [
        {
          hour: "01",
          weather: ["Clouds", "overcast clouds"],
          temperature: 0,
          rain: 0,
        },
      ],
      daily_forecast: [],
      sunrise: "00:00",
      sunset: "00:00",
      map_url:
        "https://weather-application-ww10.onrender.com/images/google-map.png?n=0.0016887951668809187",
      precipitation_url:
        "https://weather-application-ww10.onrender.com/images/precipitation-map.png?n=0.5188311155210956",
    };
  }

  onSubmit = (value) => {
    this.getLocationCoordinates(value);
    this.setState({ route: "Weather" });
  };

  getLocationCoordinates(location) {
    fetch(
      "https://weather-application-ww10.onrender.com/location-coordinates",
      {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ location }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          const name = data[0].display_name.split(",")[0];
          this.setState({ name });

          this.getCurrentWeatherData(latitude, longitude);
          this.getHourlyForecast(latitude, longitude);
          this.getPrecipitationMap(latitude, longitude);
          this.getDailyForecast(latitude, longitude);
        } else {
          console.error("Location not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  getCurrentWeatherData(latitude, longitude) {
    fetch("https://weather-application-ww10.onrender.com/current-weather", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((data) => data.json())
      .then((data) => {
        const temp = Math.round(data.main.temp);
        const weather = data.weather[0];
        const { wind } = data;
        const feels_like = Math.round(data.main.feels_like);
        const { humidity } = data.main;
        const visibility = data.visibility / 1000;

        const convert_unix = (unix, timezone) => {
          const offset = new Date().getTimezoneOffset();
          const offsetTimestamp = unix + offset * 60 + timezone;
          const time = new Date(offsetTimestamp * 1000);

          return time.toLocaleTimeString();
        };

        const { timezone } = data;
        let { sunrise, sunset } = data.sys;

        if (sunrise) {
          sunrise = convert_unix(sunrise, timezone).slice(0, 5);
        }
        if (sunset) {
          sunset = convert_unix(sunset, timezone).slice(0, 5);
        }

        const time = convert_unix(data.dt, timezone).slice(0, 5);
        const hour = time.split(":")[0];

        this.setState({
          weather,
          temp,
          sunrise,
          sunset,
          wind,
          hour,
          feels_like,
          visibility,
          humidity,
          time,
        });
      });
  }

  getHourlyForecast(latitude, longitude) {
    fetch("https://weather-application-ww10.onrender.com/forecast", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((data) => data.json())
      .then((data) => {
        const { timezone } = data.city;

        const convert_unix = (unix, timezone) => {
          const offset = new Date().getTimezoneOffset();
          const offsetTimestamp = unix + offset * 60 + timezone;
          const time = new Date(offsetTimestamp * 1000);

          return time.toLocaleTimeString();
        };

        const highest = [];
        const lowest = [];

        const hourly_forecast = data.list.slice(0, 10).map((prediction) => {
          const hour = convert_unix(prediction.dt, timezone).split(":")[0];

          const temperature = Math.round(prediction.main.temp);
          const { main, description } = prediction.weather[0];
          const weather = [main, description];
          const { temp_min, temp_max } = prediction.main;

          let rain = 0;
          if (prediction.rain) {
            rain = Math.round(prediction.pop * 100) + "%";
          }

          highest.push(Math.round(temp_max));
          lowest.push(Math.round(temp_min));
          return { hour, weather, temperature, rain };
        });

        const temp_max = Math.max(...highest);
        const temp_min = Math.min(...lowest);

        this.setState({ hourly_forecast, temp_max, temp_min });
      });
  }

  getDailyForecast(latitude, longitude) {
    fetch("https://weather-application-ww10.onrender.com/forecast", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((data) => data.json())
      .then((data) => {
        const daily_forecast = [];

        const week_forecast = {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        };

        const hourly_forecast = () => {
          data.list.forEach((prediction) => {
            const date = new Date(prediction.dt * 1000);

            const day = Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(date);

            const weekdays = Object.keys(week_forecast);

            //fulfilling week forecast with hourly predictions
            weekdays.forEach((weekday) => {
              const { main, description } = prediction.weather[0];
              const weather = [main, description];
              const { temp_min, temp_max } = prediction.main;

              let rain = 0;
              if (prediction.rain) {
                rain = Math.round(prediction.pop * 100) + "%";
              }

              if (day.toLowerCase() === weekday) {
                week_forecast[weekday].push({
                  weather,
                  temp_min,
                  temp_max,
                  rain,
                });
              }
            });
          });
        };

        const convert = () => {
          const weekdays = Object.keys(week_forecast);

          //convert hourly to daily forecast
          weekdays.forEach((weekday) => {
            if (week_forecast[weekday].length === 8) {
              // getting average temp and weather
              const highest = [];
              const lowest = [];
              const main = [];
              const description = [];
              const rain_list = [];

              week_forecast[weekday].forEach((prediction) => {
                main.push(prediction.weather[0]);
                description.push(prediction.weather[1]);
                lowest.push(prediction.temp_min);
                highest.push(prediction.temp_max);
                let rain_percentage = 0;
                if (prediction.rain) {
                  rain_percentage = prediction.rain;
                }
                rain_list.push(rain_percentage);
              });

              function highest_occurance(array) {
                if (array.length === 0) return null;
                const modeMap = {};
                let maxEl = array[0],
                  maxCount = 1;
                for (let i = 0; i < array.length; i++) {
                  const el = array[i];
                  if (modeMap[el] == null) modeMap[el] = 1;
                  else modeMap[el]++;
                  if (modeMap[el] > maxCount) {
                    maxEl = el;
                    maxCount = modeMap[el];
                  }
                }
                return maxEl;
              }

              const temp_max = Math.round(Math.max(...highest));
              const temp_min = Math.round(Math.min(...lowest));
              const weather = [
                highest_occurance(main),
                description[main.indexOf(highest_occurance(main))],
              ];
              let rain = highest_occurance(rain_list);

              if (highest_occurance(main) === "Rain") {
                rain = rain_list[description.indexOf(weather[1])];
              }

              daily_forecast.push({
                weather,
                temp_max,
                temp_min,
                rain,
                weekday,
              });
            }
          });
        };

        hourly_forecast();
        convert();

        this.setState({ daily_forecast });
      });
  }

  getPrecipitationMap(latitude, longitude) {
    function tiles(latitude, longitude, zoom) {
      const latitude_radians = latitude * Math.PI;
      const num = 2 ** zoom;
      let x = Math.round(((longitude + 180) / 360) * num);
      let y = Math.round(
        ((1 - Math.asinh(Math.tan(latitude_radians)) / Math.PI) / 2.0) * num
      );

      if (zoom === 3 && x > 7) {
        x = 5;
      }
      if (zoom === 3 && y > 7) {
        y = 5;
      }

      const z = zoom;
      return { x, y, z };
    }

    const { x, y, z } = tiles(latitude, longitude, 3);

    fetch(`https://weather-application-ww10.onrender.com/precipitation-map`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ x, y, z }),
    })
      .then((data) => data.json())
      .then((data) => {
        const precipitation_url = data;
        this.setState({ precipitation_url });
      });

    fetch(`https://weather-application-ww10.onrender.com/google-map`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((data) => data.json())
      .then((data) => {
        const map_url = data;
        this.setState({ map_url });
      });
  }

  render() {
    const {
      route,
      name,
      weather,
      time,
      hour,
      temp,
      temp_max,
      temp_min,
      hourly_forecast,
      daily_forecast,
      sunrise,
      sunset,
      map_url,
      precipitation_url,
      wind,
      feels_like,
      humidity,
      visibility,
    } = this.state;
    if (route === "Welcome") {
      return <WelcomePage onSubmit={this.onSubmit} />;
    }
    return (
      <div className="application">
        <Background
          weather={weather}
          time={time}
          sunrise={sunrise}
          sunset={sunset}
        />
        <SearchBar onSubmit={this.onSubmit} />
        <CurrentWeather
          name={name}
          weather={weather}
          temp={temp}
          temp_max={temp_max}
          temp_min={temp_min}
        />
        <div className="widgets">
          <HourlyForecast
            forecast={hourly_forecast}
            sunrise={sunrise}
            sunset={sunset}
            weather={weather}
            temp={temp}
            hour={hour}
          />
          <Map precipitation_url={precipitation_url} map_url={map_url} />
          <DailyForecast
            forecast={daily_forecast}
            weather={weather}
            temp_max={temp_max}
            temp_min={temp_min}
          />
          <Wind wind={wind} />
          <Humidity humidity={humidity} temp={temp} />
          <FeelsLike feels_like={feels_like} temp={temp} />
          <Visibility visibility={visibility} />
          <SunState sunrise={sunrise} sunset={sunset} time={time} />
        </div>
      </div>
    );
  }
}

export default App;
