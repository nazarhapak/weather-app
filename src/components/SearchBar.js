import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import "./SearchBar.css";

const SearchBar = ( {onKeyDown} ) => {

  // const loader = new Loader({
  //   apiKey: "AIzaSyDMyuqZfStChvLf94L9-JqXah00MCsIol0",
  //   version: "weekly"
  // });

  // loader.importLibrary("places")
  // .then(({Autocomplete}) => {
  //   new Autocomplete(document.getElementById("autocomplete"), {types: ['(cities)']});
  // })

  return (
      <div className="full-view-width">
       <div className='search-bar'>
           <i className='search-icon'></i>
           <input placeholder="Search" type="text" id='autocomplete' onKeyDown={onKeyDown}></input>
       </div>
     </div>
  )
}

export default SearchBar;