import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../css/App.css';
import Nav from './Nav';
import Home from './Home';
import Forecast from './Forecast';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/forecast" component={Forecast} />
        </div>
      </Router>
    );
  }
}

export default App;
