import React, { Component } from 'react';
import '../css/Search.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const weatherKey = '348c880899f24360d8ade9d6e84acc09';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    evt.preventDefault();
    let val = evt.target.value;
    this.setState(function() {
      return { searchTerm: val };
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state.searchTerm);
    // this.props.onSubmit(this.state.searchTerm);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchTerm}&type=accurate&APPID=${weatherKey}`
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
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
          <button type="submit" className="search-btn" onClick={this.handleSubmit}>
            Get Weather
          </button>
        </form>
      </div>
    );
  }
}

// Search.propTypes = {
//   onSubmit: PropTypes.func.isRequired
// };

export default Search;
