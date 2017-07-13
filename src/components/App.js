import React, { Component } from 'react';
import '../css/App.css';
import Nav from './Nav';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Weather />
      </div>
    );
  }
}

export default App;
