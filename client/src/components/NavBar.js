import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';

class NavBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      return (
        <nav className="nav-wrapper" style={{backgroundColor: "#057481"}}>
          <div className="container">
            <Link to="/" className="brand-logo">Pocket Stocks</Link>
            <ul className="right">
              <li>Welcome, { user.name }</li>
              <li><NavLink to="/portfolio">Portfolio</NavLink></li>
              <li><NavLink to="/transactions">Transactions</NavLink></li>
              <button 
                className="btn btn-large waves-effect waves-light hoverable" 
                style={{backgroundColor: "#f49f0a"}} 
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
      );
    } else {
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
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));