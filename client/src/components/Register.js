import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import classnames from 'classnames';


class Register extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    password2: null,
    errors: {},
    balance: 5000
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to portfolio
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/portfolio");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      balance: this.state.balance
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h4 className="center">Register!</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={this.handleChange} error={errors.name} className={classnames("", { invalid: errors.name })} />
              <span className="red-text">{errors.name}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={this.handleChange} error={errors.email} className={classnames("", { invalid: errors.email })} />
              <span className="red-text">{errors.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" onChange={this.handleChange} error={errors.password} className={classnames("", { invalid: errors.password })} />
              <span className="red-text">{errors.password}</span>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="password2">Confirm Password:</label>
              <input type="password" id="password2" onChange={this.handleChange} error={errors.password2} className={classnames("", { invalid: errors.password2 })} />
              <span className="red-text">{errors.password2}</span>
            </div>
          </div>
          <div className="row">
            <div className="center input-field col s12">
              <button className="btn" style={{backgroundColor: "#057481"}}>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));