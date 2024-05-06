import React from "react";
import "./Background.css";


const Background = ({weather, time, sunset, sunrise}) => {
    const night = () => {
        let sunrise_minutes;
        if (sunrise) {sunrise_minutes = Number(sunrise.split(":")[0] * 60 + sunrise.split(":")[1])};

        let sunset_minutes;
        if (sunset) {sunset_minutes = Number(sunset.split(":")[0] * 60 + sunset.split(":")[1])}

        const current_minutes = Number(time.split(":")[0] * 60 + time.split(":")[1]);

        if ((sunset_minutes <= current_minutes) || (0 <= current_minutes && current_minutes < sunrise_minutes)) {
            return true;
        } else {
            return false;
        }
    }

    const getBackgroundGradient = () => {
        if (night()) {
            return "linear-gradient(to left top, #403d3d, #1a1a1c)";
        }
        switch (weather.main) {
            case "Thunderstorm" || "Tornado":
              return "linear-gradient(to left top, #2e323a , #33445f)";
            case "Drizzle" || "Rain" || "Squall":
              return "linear-gradient(to left top, #81846e, #94a5c2)";
            case "Clear":
                return "linear-gradient(to left top, #b7d6ea,#3b3da2)";
            case "Snow":
                return "linear-gradient(to left top, #e1ecff, #7b8cac)";
            case "Sand" || "Dust":
                return "linear-gradient(to left top, #c6970b, #774f06)";
            case "Ash" || "Smoke":
                return "linear-gradient(to left top, #5d594d, #30291e)";
            case "Mist" || "Haze" || "Fog":
                return "linear-gradient(to left top, #a1a9b7, #737c8d)";
            case "Clouds":
                return "linear-gradient(to left top, #757F9A , #92959a)";
            default:
                return "linear-gradient(to left top, #b7d6ea,#3b3da2)";
        }
    }

    return (<div className="background" style={{background: getBackgroundGradient()}}></div>)
}

export default Background;