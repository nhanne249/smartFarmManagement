const express = require("express");
const route = express.Router();
const data = require("../service/data.service");

route.get('/analyst', data.analysit);
route.get('/equipment-status', data.getStatus);

module.exports = route;