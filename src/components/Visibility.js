import React from 'react'
import "./Visibility.css"
import image from "../images/widget-icons/visibility.png";

const Visibility = ({visibility}) => {
  const getDescription = () => {
    if (visibility === 10) {
      return "It is perfectly clear right now."
    } else if (8 <= visibility && visibility < 10) {
      return "Good visibility, objects clearly visible."
    } else if (6 <= visibility && visibility < 8) {
      return "It is faitly clear right now.";
    } else if (3 <= visibility && visibility < 6) {
      return "Poor visibility, objects somewhat visible but blurry.";
    } else if (1 <= visibility && visibility < 3) {
      return ("Very poor visibility, objects barely visible.");
    } else if (0 < visibility && visibility < 1) {
      return ("It is barely visible right now.");
    } else if (visibility === 0) {
      return ("No visibility, complete fog or darkness.");
    }
  }

  return (
    <div className='visibility'>
        <p className='widget-name'>
          <img alt="precipitation" src={image} className='widget-icon'></img>
          VISIBILITY
        </p>
        <p className='distance'>{visibility} km</p>
        <p className='description'>{getDescription()}</p>
    </div>
  )
}

export default Visibility;