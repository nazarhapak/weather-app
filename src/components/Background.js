import React from "react";
import "./Background.css";


const Background = ({weather, time, sunset, sunrise}) => {
    const getBackground = () => {
        let conditions = "rain";
        if (weather.main) {conditions = weather.main.toLowerCase();}
        const image = require(`../images/background-images/${conditions}.jpg`)
        return <img className="background" src={image}></img>
    }

    return (<>{getBackground()}</>)
}

export default Background;