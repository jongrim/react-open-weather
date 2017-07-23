import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import '../css/Detail.css';

const weatherKey = '348c880899f24360d8ade9d6e84acc09';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.match.params.cityName
    };
  }

  componentDidMount() {
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

  convertKelvinTemp(temp) {
    return Math.round(temp * (9 / 5) - 459.67);
  }

  render() {
    const weather = this.state.current;

    return (
      <div className="container">
        {!weather && <Loading text="Sticking our hand out the window" />}
        {weather &&
          <div className="detail">
            <img
              style={{ height: '75px' }}
              src={`${process.env.PUBLIC_URL}/images/weather-icons/${weather.weather[0].icon}.svg`}
              alt={weather.weather[0].main + 'icon'}
            />
            <h1>
              {weather.name}
            </h1>
            <p>
              {weather.weather[0].main}
            </p>
            <p>
              {this.convertKelvinTemp(parseFloat(weather.main.temp))}°
            </p>
            {console.log(weather)}
          </div>}
      </div>
    );
  }
}

export default Detail;
