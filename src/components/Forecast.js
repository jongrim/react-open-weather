import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
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
    console.log(this.props.location.search);
    const { city: searchTerm = '' } = queryString.parse(this.props.location.search);
    console.log(searchTerm);
    this.setState(() => {
      return {
        searchTerm: searchTerm
      };
    }, this.getAllWeather);
  }

  getAllWeather() {
    console.log(this);
    axios
      .all([this.getCurrentWeather(), this.getForecastWeather()])
      .then(
        axios.spread((cur, forecast) => {
          console.log(cur);
          console.log(forecast);
          this.setState(() => {
            return { current: cur.data, forecast: forecast.data };
          });
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
    const current = this.state.current;
    const forecast = this.state.forecast;

    return (
      <div>
        <h1>Forecast</h1>
        {!(current && forecast) && <Loading text="Sticking our hand out the window" />}
        {current && JSON.stringify(current)}
        {forecast && JSON.stringify(forecast)}
      </div>
    );
  }
}

export default Forecast;
