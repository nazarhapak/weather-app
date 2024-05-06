import React from 'react'
import "./Wind.css"
import image from "../images/widget-icons/wind.png";
import arrowImg from "../images/arrow.png"

const Wind = ({wind}) => {
  const {speed, gust, deg} = wind;

  const wind_direction = () => {
    let direction = 230 + deg;
    if (direction > 360) {
      direction = direction - 360;
    }

    switch (direction) {
      case 0: return "S";
      case 45: return "SW";
      case 90: return "W";
      case 135: return "NW";
      case 180: return "N";
      case 225: return "NE";
      case 270: return "E";
      case 315: return "SE";
      case 360: return "S";
      default: break;
    }

    if (0 < direction && direction < 45) { return "SSW" }
    if (45 < direction && direction < 90) { return "WSW" }
    if (90 < direction && direction < 135) { return "WNW" }
    if (135 < direction && direction < 180) { return "NNW" }
    if (180 < direction && direction < 225) { return "NNE" }
    if (225 < direction && direction < 270) { return "ENE" }
    if (270 < direction && direction < 315) { return "ESE" }
    if (315 < direction && direction < 360) { return "SES" }
  }

  return (
    <div className='wind'>
      <p className='widget-name'>
        <img alt="precipitation" src={image} className='widget-icon'></img>
        WIND
      </p>
      <div className='wind-wrapper'>
        <div className='speed'>
          <div className='wind-speed'>
            <p className='value'>{Math.round(speed)}</p>
            <div className='units'>
              <p>M/S</p>
              <p className='wind-type'>Wind</p>
            </div>
          </div>
          <hr></hr>
          <div className='gusts-speed'>
            <p className='value'>{gust ? Math.round(gust) : 0}</p>
            <div className='units'>
              <p>M/S</p>
              <p className='wind-type'>Gusts</p>
            </div>
          </div>
        </div>

        <div className="compass">
          <div className='compass-image'>
            <div className='north'><div className='north-letter letter'>N</div></div>
            <div className='tick north-east'></div>
            <div className='tick east'><div className='east-letter letter'>E</div></div>
            <div className='tick south-east'></div>
            <div className='tick south'><div className='south-letter letter'>S</div></div>
            <div className='tick south-west'></div>
            <div className='tick west'><div className='west-letter letter'>W</div></div>
            <div className='tick north-west'></div>
          </div>

          <div className='arrow'>
            <img src={arrowImg} alt='arrow' style={{transform: `rotate(${(230 + deg)}deg)`}}></img>
          </div>

          <div className='wind-direction'>
            <p className='direction'>{wind_direction()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wind;