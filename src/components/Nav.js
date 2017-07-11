import React from 'react';
import '../css/Nav.css';

const Nav = props => {
  return (
    <div className="navbar">
      <h1>Open Weather</h1>
      <form>
        <input type="text" className="navbar-search" placeholder="Enter a city and state" />
        <button type="submit" className="navbar-search-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Nav;
