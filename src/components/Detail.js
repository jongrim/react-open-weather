import React, { Component } from 'react';
import axios from 'axios';
import { getDate, convertTemp } from '../utils/utils.js';
import Loading from './Loading';
import '../css/Detail.css';

const _ = require('lodash');

const weatherKey = '348c880899f24360d8ade9d6e84acc09';

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
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&type=accurate&APPID=${weatherKey}`)
      .then(res => {
        this.setState(() => {
          return { current: res.data };
        });
      })
      .catch(err => {
        console.log(err);
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
