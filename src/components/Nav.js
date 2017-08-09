import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';
import Search from './Search';

const Nav = props => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>React Weather</h1>
      </Link>
      <Search />
    </div>
  );
};

export default Nav;
