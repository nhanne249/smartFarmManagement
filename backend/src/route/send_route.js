const express = require("express");
const route = express.Router();
const sendController = require("../controller/sendController");

route.get('/fan', sendController.api_fan_send);
route.get('/pump', sendController.api_pmup_send);

module.exports = route;