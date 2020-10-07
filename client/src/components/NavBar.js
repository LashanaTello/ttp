import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-wrapper" style={{backgroundColor: "#057481"}}>
        <div className="container">
          <Link to="/" className="brand-logo">Pocket Stocks</Link>
          <ul className="right">
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/transactions">Transactions</NavLink></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;