import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../css/App.css';
import Nav from './Nav';
import Home from './Home';
import Forecast from './Forecast';
import Detail from './Detail';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/forecast" component={Forecast} />
          <Route path="/detail/:cityName" component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;
