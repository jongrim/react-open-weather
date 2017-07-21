import React, { Component } from 'react';
import axios from 'axios';
const queryString = require('query-string');

const weatherKey = '348c880899f24360d8ade9d6e84acc09';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null
    };
  }

  componentDidMount() {
    const { searchTerm = '' } = queryString.parse(this.props.location.search);
    this.setState(() => {
      return {
        searchTerm: searchTerm
      };
    });
    axios
      .all([this.getCurrentWeather(), this.getForecastWeather()])
      .then(
        axios.spread((cur, forecast) => {
          console.log(cur);
          console.log(forecast);
        })
      )
      .catch(err => {
        console.error(err);
      });
  }

  getCurrentWeather() {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchTerm}&type=accurate&APPID=${weatherKey}`
    );
  }

  getForecastWeather() {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state
        .searchTerm}&type=accurate&APPID=${weatherKey}&cnt=5`
    );
  }

  render() {
    return (
      <div>
        <h1>Forecast</h1>
      </div>
    );
  }
}

export default Forecast;
