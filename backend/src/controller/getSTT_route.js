const express = require("express");
const route = express.Router();
const getSTTController = require("../controller/getSTTController");

route.get('/', getSTTController.getSTT);

module.exports = route;