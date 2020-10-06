const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require("passport");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));