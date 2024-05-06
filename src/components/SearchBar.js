import React, {Component} from 'react';
import './SearchBar.css';

document.addEventListener("click", () => {
  const autocomplete = document.getElementById("autocomplete");
    const suggestions = autocomplete.querySelectorAll("div");
    
    suggestions.forEach(suggestion => {
      suggestion.remove();
    });
});

class SearchBar extends Component {
  constructor ({ onSubmit }) {
    super();
    this.onSubmit = onSubmit;
    this.state = {
      inputValue: "",
      currentFocus: -1
    }
  }

  onKeyDown = (event) => {
    let { currentFocus } = this.state;
    const suggestionsLength = document.getElementById("autocomplete").children.length - 2;
  
    if (event.key === 'Enter') {
      const suggestionValue = document.getElementById(`suggestion-${this.state.currentFocus}`)?.textContent;
      document.getElementById(`suggestion-${this.state.currentFocus}`)?.click()
      this.onSubmit(suggestionValue || this.state.inputValue);
      document.getElementById("searchInput").style.borderRadius = "5px"
      this.closeSuggestions();
    }
  
    if (event.key === "ArrowDown" && currentFocus < suggestionsLength) {
      this.setState(prevState => ({ currentFocus: prevState.currentFocus + 1 }), () => {this.setActive(this.state.currentFocus)})
    }

    if (event.key === "ArrowUp" && currentFocus > -1) {
      event.preventDefault();
      this.setState(prevState => ({ currentFocus: prevState.currentFocus - 1 }), () => {this.setActive(this.state.currentFocus)});
    }
  }

  onChange = (event) => {
    this.setState({ currentFocus: -1})
    this.setState({inputValue: event.target.value});
    this.getSuggestions(event.target.value)
    .then(suggestions => {
      const input = document.getElementById("searchInput");
      if (suggestions.length) {
        input.style.borderRadius = "5px 5px 0 0"
      } else {
        input.style.borderRadius = "5px"
      }
      this.closeSuggestions(); 
      this.generateSuggestions(suggestions);
    })
  }

  getSuggestions = (value) => {
    return fetch(`https://autocomplete.travelpayouts.com/places2?locale=en&types[]=city&term=${value}`)
    .then(data => data.json())
    .then(data => {
      let suggestions = data.map(suggestion => {
        const city = suggestion.name;
        const country = suggestion.country_name;
        const code = suggestion.country_code;
        return({city, country, code})
      })

      if (suggestions.length > 5) {
        suggestions = suggestions.slice(0, 5)
      }

      return suggestions;
    })
  }

  generateSuggestions = (suggestions) => {
    const autocomplete = document.getElementById('autocomplete');
    suggestions.forEach((element, key) => {
      let {city, country} = element;    
      const suggestion = document.createElement("DIV");
      suggestion.setAttribute("id", "suggestion-" + key);
      suggestion.setAttribute("class", "suggestion");
      suggestion.innerHTML =  `${city} <div class="suggestion-country">${country}</div>`;

      if (key === suggestions.length - 1) {
        suggestion.style.borderRadius = "0 0 5px 5px"
      }

      suggestion.addEventListener("click", () => {
        document.getElementById("searchInput").value = `${city}`;
        document.getElementById("searchInput").style.borderRadius = "5px"
        this.setState({inputValue: `${city}, ${country}`})
        this.onSubmit(`${city}, ${country}`);
        this.closeSuggestions();
    });

      autocomplete.appendChild(suggestion)
    })
  }

  closeSuggestions = () => {
    const autocomplete = document.getElementById("autocomplete");
    const suggestions = autocomplete.querySelectorAll("div");
    
    suggestions.forEach(suggestion => {
      suggestion.remove();
    });
  }

  setActive = (id) => {
    const autocomplete = document.getElementById("autocomplete");
    const suggestions = autocomplete.querySelectorAll("div");
    
    suggestions.forEach(suggestion => {
      suggestion.classList.remove("suggestion-active");
    });

    if (id !== -1) {
      const suggestion = document.getElementById(`suggestion-${id}`);
      suggestion.classList.add("suggestion-active");
    }
  }

  render () {
    return (
      <div className="full-view-width">
        <div className='search-bar'>
          <i className='search-icon'></i>
          <div className="autocomplete" id='autocomplete'>
            <input placeholder="Search" type="text" onKeyDown={this.onKeyDown} onChange={this.onChange} id='searchInput' autoComplete='off'></input>
          </div>
        </div>
      </div>
    );
  }
  
};

export default SearchBar;