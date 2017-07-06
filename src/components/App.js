import React, { Component } from 'react';
import '../css/App.css';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div>Hello World!</div>
      </div>
    );
  }
}

export default App;
