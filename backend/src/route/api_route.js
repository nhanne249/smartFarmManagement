const express = require("express");
const route = express.Router();
const apiController = require("../controller/apiController");

route.get('/analysit', apiController.api_analysit);
route.get('/calliot', apiController.api_call_iot);

module.exports = route;