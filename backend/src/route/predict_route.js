const express = require("express");
const route = express.Router();
const predictController = require("../controller/predictController");

route.get('/', predictController.predict_temp);

module.exports = route;