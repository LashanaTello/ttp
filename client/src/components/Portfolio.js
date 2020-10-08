import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { alphaToken } from '../apiKeys';
import axios from 'axios';

class Portfolio extends Component {
  state = {
    ticker: null,
    quantity: null,
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    var url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.ticker}&apikey=${alphaToken}`;
    axios.get(url)
      .then(res => {
        //console.log(res.data);
        if (res.data.bestMatches.length === 0) {
          var err = { ticker: "Invalid ticker" };
          this.setState({
            errors: err
          })
        } else {
          var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.ticker}&apikey=${alphaToken}`;
          axios.get(url)
            .then(res => {
              console.log(res.data);
              var total = res.data['Global Quote']['05. price'] * this.state.quantity;
              if (user.balance < total) {
                var err = { quantity: "You do not have a high enough balance to purchase this" };
                this.setState({
                  errors: err
                })
              } else {
                var bal = user.balance - total;
                const buyData = {
                  id: user.id,
                  balance: bal,
                  ticker: this.state.ticker,
                  quantity: this.state.quantity,
                  price: res.data['Global Quote']['05. price']
                };
                axios
                  .post("/api/users/buy", buyData)
                  .then(res => this.props.history.push("/portfolio"))
                  .catch(err =>
                    console.log(err)
                  );
              }
            })
            .catch(error => console.log(error))
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="container">
          Portfolio
          <div className="row">
          	<div className="col s6"></div>
          	<div className="col s6">
          		<h3>Cash - ${ user.balance }</h3>
              <form onSubmit={this.handleSubmit} >
                <div className="input-field col s12">
                  <label htmlFor="ticker">Ticker:</label>
                  <input type="text" id="ticker" onChange={this.handleChange} error={errors.ticker} className={classnames("", { invalid: errors.ticker || errors.tickernotfound })} />
                  <span className="red-text">{errors.ticker}{errors.tickernotfound}</span>
                </div>
                <div className="input-field col s12">
                  <label htmlFor="quantity">Quantity:</label>
                  <input type="number" id="quantity" onChange={this.handleChange} error={errors.quantity} className={classnames("", { invalid: errors.quantity || errors.quantityincorrect })} />
                  <span className="red-text">{errors.quantity}{errors.quantityincorrect}</span>
                </div>
                <div className="center input-field col s12">
                  <button className="btn btn-large" style={{backgroundColor: "#057481"}}>Buy</button>
                </div>
              </form>
          	</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          You need to make an account to access your portfolio!
          <div>
            <Link to='/login'>Login </Link>
          </div>
          <div>
          <Link to='/register'>Register </Link>
          </div>
        </div>
      );
    }
  }
}

Portfolio.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Portfolio));