import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import '../css/Forecast.css';
import { getDate } from '../utils/utils.js';
import { getForecast } from '../utils/api.js';

const _ = require('lodash');
const queryString = require('query-string');

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
    }, this.getWeather);
  }

  getWeather() {
    getForecast(this.state.searchTerm).then(res => {
      this.setState(() => {
        return {
          forecast: res.data
        };
      });
    });
  }

  componentDidUpdate() {
    const { city: searchTerm = '' } = queryString.parse(this.props.location.search);
    if (searchTerm !== this.state.searchTerm) {
      this.setState(() => {
        return { searchTerm: searchTerm };
      }, this.getWeather);
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
                  <p>
                    {getDate(item.dt)}
                  </p>
                  <Link
                    to={{
                      pathname: `/detail/${this.state.searchTerm}`,
                      state: { weather: item }
                    }}>
                    <img
                      style={{ height: '50px' }}
                      src={`${process.env.PUBLIC_URL}/images/weather-icons/${item.weather[0].icon}.svg`}
                      alt="Icon"
                    />
                    <p style={{ color: 'white' }}>
                      {_.capitalize(item.weather[0].description)}
                    </p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Forecast;
