import express from "express";
import data from "../service/data.service.js";

const route = express.Router();

route.get('/analyst', data.analysit);
route.get('/equipment-status', data.getStatus);

export default route;