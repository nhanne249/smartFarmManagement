const express = require("express");
const route = express.Router();
const control = require("../service/control.service");

route.patch('/fan', control.fan);
route.patch('/pump', control.pump);

module.exports = route;