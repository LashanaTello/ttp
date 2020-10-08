const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePortfolioInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.ticker = !isEmpty(data.ticker) ? data.ticker : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  // Ticker checks
  if (Validator.isEmpty(data.ticker)) {
    errors.ticker = "Ticker is required";
  }

  // Quantity checks
  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};