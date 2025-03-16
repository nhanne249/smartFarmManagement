const express = require("express");
const route = express.Router();
const apiController = require("../controller/apiController");

route.get('/analysit', apiController.api_analysit);

module.exports = route;