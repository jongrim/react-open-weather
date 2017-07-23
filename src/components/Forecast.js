import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import '../css/Forecast.css';
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
      .get(
        `http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state
          .searchTerm}&type=accurate&APPID=${weatherKey}&cnt=5`
      )
      .then(res => {
        this.setState(() => {
          return { forecast: res.data };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidUpdate() {
    const { city: searchTerm = '' } = queryString.parse(this.props.location.search);
    if (searchTerm !== this.state.searchTerm) {
      this.setState(() => {
        return { searchTerm: searchTerm };
      }, this.getAllWeather);
    }
  }

  render() {
    const forecast = this.state.forecast;

    return (
      <div className="container">
        <h1>
          {this.state.searchTerm}
        </h1>
        <div className="forecast">
          {!forecast && <Loading text="Sticking our hand out the window" />}
          {forecast &&
            this.state.forecast.list.map((item, i) => {
              return (
                <div key={i}>
                  <img
                    style={{ height: '50px' }}
                    src={`${process.env.PUBLIC_URL}/images/weather-icons/${item.weather[0].icon}.svg`}
                    alt="Icon"
                  />
                  <p style={{ color: 'white' }}>
                    {item.weather[0].description.toUpperCase()}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Forecast;
