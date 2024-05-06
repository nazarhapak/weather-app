import React from 'react'
import "./Map.css"
import image from "../images/widget-icons/precipitation.png";

const Map = ({map_url, precipitation_url}) => {
  return (
    <div className='map'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          PRECIPITATION
        </p>
        <div className='precipitation-map' style={{backgroundImage: `url(${map_url})`}}>
          <img alt="precipitation-map" src={precipitation_url} className='precipitation-map-image' 
          onError={() => {document.getElementsByClassName("precipitation-map-image")[0].style.display = "none";}}
          onLoad={() => {document.getElementsByClassName("precipitation-map-image")[0].style.display = "block";}}></img>
        </div>
    </div>
  )
}

export default Map;