const express = require("express");
const route = express.Router();
const apiController = require("../service/data.service");

route.get('/analyst', apiController.api_analysit);

module.exports = route;