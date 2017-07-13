import React, { Component } from 'react';
import '../css/Weather.css';
import Search from './Search';

const Weather = props => {
  return (
    <div className="weather">
      <h1>Enter a City and State</h1>
      <Search />
    </div>
  );
};

export default Weather;
