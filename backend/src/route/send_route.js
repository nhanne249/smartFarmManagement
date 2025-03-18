const express = require("express");
const route = express.Router();
const sendController = require("../controller/sendController");

route.get('/', sendController.api_send);

module.exports = route;