import React from 'react';
import "./WelcomePage.css";
import image from "../images/welcome.png"
import SearchBar from './SearchBar';

const WelcomePage = ({onSubmit}) => {
    return(
        <div className='welcome-page'>
            <div className='description'>
                <h2>Welcome to Weather Application!</h2>
                <p>Enter location to see weather</p>
            </div>
            <img alt="welcome" src={image} className='welcome-image'></img>
            <SearchBar onSubmit={onSubmit}/>
        </div>
    );
}

export default WelcomePage;