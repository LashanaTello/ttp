import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  state = {
    email: null,
    password: null,
    errors: {}
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to portfolio page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/portfolio");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/portfolio"); // push user to portfolio when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h4 className="center">Login!</h4>
        <form onSubmit={this.handleSubmit} >
          <div className="input-field col s12">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" onChange={this.handleChange} error={errors.email} className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
            <span className="red-text">{errors.email}{errors.emailnotfound}</span>
          </div>
          <div className="input-field col s12">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={this.handleChange} error={errors.password} className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
            <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
          </div>
          <div className="center input-field col s12">
            <button className="btn btn-large" style={{backgroundColor: "#057481"}}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);