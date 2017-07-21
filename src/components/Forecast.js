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
    const { city: searchTerm = '' } = queryString.parse(this.props.location.search);
    this.setState(() => {
      return {
        searchTerm: searchTerm
      };
    }, this.getAllWeather);
  }

  getAllWeather() {
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

  componenDidUpdate() {
    console.log(this.props.location.search);
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
        <h1>
          {this.state.searchTerm}
        </h1>
        {!(current && forecast) && <Loading text="Sticking our hand out the window" />}
        {current &&
          forecast &&
          this.state.forecast.list.map((item, i) => {
            return (
              <div key={i}>
                <img src={`${process.env.PUBLIC_URL}/images/weather-icons/${item.weather[0].icon}.svg`} alt="Icon" />
                <p>
                  {item.weather[0].description}
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Forecast;
