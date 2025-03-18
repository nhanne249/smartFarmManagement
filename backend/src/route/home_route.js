const express = require("express");
const route = express.Router();
const homeController = require("../controller/homeController");

route.get('/', homeController.api_home);

module.exports = route;