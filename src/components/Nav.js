import React from 'react';
import '../css/Nav.css';
import Search from './Search';

const Nav = props => {
  return (
    <div className="navbar">
      <h1>Open Weather</h1>
      <Search />
    </div>
  );
};

export default Nav;
