import React, { Component } from 'react';
import { getDate, convertTemp } from '../utils/utils.js';
import Loading from './Loading';
import '../css/Detail.css';
import { getDetail } from '../utils/api.js';

const _ = require('lodash');

class Detail extends Component {
  constructor(props) {
    super(props);
    if (props.location.state) {
      this.state = {
        city: props.match.params.cityName,
        weather: props.location.state.weather
      };
    } else {
      this.state = {
        city: props.match.params.cityName
      };
    }
  }

  componentDidMount() {
    if (this.state.weather) return;
    getDetail(this.state.city).then(data => {
      this.setState(() => {
        return {
          current: data
        };
      });
    });
  }

  render() {
    const current = this.state.current;
    const weather = this.state.weather;

    return (
      <div className="container">
        {!(current || weather) && <Loading text="Sticking our hand out the window" />}
        {current &&
          <div className="detail">
            <img
              style={{ height: '75px' }}
              src={`${process.env.PUBLIC_URL}/images/weather-icons/${current.weather[0].icon}.svg`}
              alt={current.weather[0].main + ' icon'}
            />
            <h1>
              {current.name}
            </h1>
            <p>
              {current.weather[0].main}
            </p>
            <p>
              {convertTemp(current.main.temp)}°
            </p>
            {console.log(current)}
          </div>}
        {weather &&
          <div className="detail">
            <img
              style={{ height: '75px' }}
              src={`${process.env.PUBLIC_URL}/images/weather-icons/${weather.weather[0].icon}.svg`}
              alt={weather.weather[0].main + ' icon'}
            />
            <h1>
              {this.state.city}
            </h1>
            <p>
              {getDate(weather.dt)}
            </p>
            <p>
              {_.capitalize(weather.weather[0].description)}
            </p>
            <p>
              Temperature: {convertTemp(weather.temp.day)}°
            </p>
          </div>}
      </div>
    );
  }
}

export default Detail;
