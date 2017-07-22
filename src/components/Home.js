import React from 'react';
import '../css/Home.css';
import Search from './Search';

const Home = props => {
  return (
    <div className="home">
      <h1>Enter a City and State</h1>
      <Search />
    </div>
  );
};

export default Home;
