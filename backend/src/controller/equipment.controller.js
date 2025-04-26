import express from "express";
import control from "../service/control.service.js";

const route = express.Router();

route.patch('/fan', control.fan);
route.patch('/pump', control.pump);

export default route;