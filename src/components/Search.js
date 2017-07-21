import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    let val = evt.target.value;
    this.setState(function() {
      return { searchTerm: val };
    });
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            className="search-field"
            placeholder="Enter a city and state"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <Link to={{ pathname: '/forecast', search: `?city=${this.state.searchTerm}` }}>
            <button type="submit" className="search-btn">
              Get Weather
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Search;
