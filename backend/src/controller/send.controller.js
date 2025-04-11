const express = require("express");
const route = express.Router();
const sendController = require("../service/control.service");

route.patch('/fan', sendController.api_fan_send);
route.patch('/pump', sendController.api_pmup_send);

module.exports = route;