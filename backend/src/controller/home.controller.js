import express from "express";
import homeController from "../service/homeController.js";

const route = express.Router();

route.get('/', homeController.api_home);

export default route;